const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const path = require('path');
const spawn = require('child_process').spawn;

// @route POST api/size-assistant
// @desc Get size recommendation for items not from Best Fit
// @access Public
router.post(
  '/',
  [
    check('weight', 'Weight is required').exists({ checkFalsy: true }),
    check('height', 'Height is required').exists({ checkFalsy: true }),
    check('gender', 'Gender is required').not().isEmpty(),
    check('unit', 'Unit is required').not().isEmpty(),
    // Whether measurements shown in the size guide refer to body measurements or measurements of the garment
    check('meatype', 'Measurement type is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { size1, size2, size3, size4, size5, size6, size7, size8 } = req.body;

    const sizesArray = [size1, size2, size3, size4, size5, size6, size7, size8];
    const len = sizesArray.length;

    if (!sizesArray[0]) {
      return res.status(400).json({ msg: 'Please provide sizes' });
    }

    for (var i = len; i >= 0; i--) {
      if (!sizesArray[i]) sizesArray.splice(i, 1);
    }

    const {
      height,
      weight,
      gender,
      meatype,
      unit,
      category,
      size1chest,
      size1waist,
      size2chest,
      size2waist,
      size3chest,
      size3waist,
      size4chest,
      size4waist,
      size5chest,
      size5waist,
      size6chest,
      size6waist,
      size7chest,
      size7waist,
      size8chest,
      size8waist,
    } = req.body;

    const size1Array = [size1chest, size1waist];
    const size2Array = [size2chest, size2waist];
    const size3Array = [size3chest, size3waist];
    const size4Array = [size4chest, size4waist];
    const size5Array = [size5chest, size5waist];
    const size6Array = [size6chest, size6waist];
    const size7Array = [size7chest, size7waist];
    const size8Array = [size8chest, size8waist];

    const sizeArraysArray = [
      size1Array,
      size2Array,
      size3Array,
      size4Array,
      size5Array,
      size6Array,
      size7Array,
      size8Array,
    ];

    const newSizesArray = [];
    sizesArray.forEach(size => {
      let sizeIndex = sizesArray.indexOf(size);
      let newSize = {
        size,
        chest: sizeArraysArray[sizeIndex][0]
          ? sizeArraysArray[sizeIndex][0].split('-').map(size => size.trim())
              .length > 1
            ? {
                from: parseFloat(
                  sizeArraysArray[sizeIndex][0]
                    .split('-')
                    .map(size => size.trim())[0]
                ),
                to: parseFloat(
                  sizeArraysArray[sizeIndex][0]
                    .split('-')
                    .map(size => size.trim())[1]
                ),
              }
            : {
                from: parseFloat(sizeArraysArray[sizeIndex][0].trim()),
                to: parseFloat(sizeArraysArray[sizeIndex][0].trim()),
              }
          : {
              from: -1,
              to: -1,
            },
        waist: sizeArraysArray[sizeIndex][1]
          ? sizeArraysArray[sizeIndex][1].split('-').map(size => size.trim())
              .length > 1
            ? {
                from: parseFloat(
                  sizeArraysArray[sizeIndex][1]
                    .split('-')
                    .map(size => size.trim())[0]
                ),
                to: parseFloat(
                  sizeArraysArray[sizeIndex][1]
                    .split('-')
                    .map(size => size.trim())[1]
                ),
              }
            : {
                from: parseFloat(sizeArraysArray[sizeIndex][1].trim()),
                to: parseFloat(sizeArraysArray[sizeIndex][1].trim()),
              }
          : {
              from: -1,
              to: -1,
            },
      };
      newSizesArray.push(newSize);
    });

    if (unit === 'in') {
      for (var i = 0; i < newSizesArray.length; i++) {
        if (
          category === 'tshirt' ||
          category === 'shirt' ||
          category === 'dress'
        ) {
          newSizesArray[i].chest.from = newSizesArray[i].chest.from * 2.54;
          newSizesArray[i].chest.to = newSizesArray[i].chest.to * 2.54;
        } else {
          newSizesArray[i].waist.from = newSizesArray[i].waist.from * 2.54;
          newSizesArray[i].waist.to = newSizesArray[i].waist.to * 2.54;
        }
      }
    }

    if (meatype === 'garment') {
      switch (category) {
        case 'tshirt':
          for (var i = 0; i < newSizesArray.length; i++) {
            newSizesArray[i].chest.from = newSizesArray[i].chest.from * 2 - 4;
            newSizesArray[i].chest.to = newSizesArray[i].chest.to * 2 - 4;
          }
          break;
        case 'shirt':
          for (var i = 0; i < newSizesArray.length; i++) {
            newSizesArray[i].chest.from = newSizesArray[i].chest.from * 2 - 10;
            newSizesArray[i].chest.to = newSizesArray[i].chest.to * 2 - 10;
          }
          break;
        case 'dress':
          for (var i = 0; i < newSizesArray.length; i++) {
            newSizesArray[i].chest.from = newSizesArray[i].chest.from * 2 - 10;
            newSizesArray[i].chest.to = newSizesArray[i].chest.to * 2 - 10;
          }
          break;
      }
    }

    try {
      const pypath = path.join(
        __dirname,
        '../..',
        'utils',
        'size_assistant.py'
      );
      const params = [pypath];
      params.push(height);
      params.push(weight);
      let chestWidth;
      let waistCirc;
      let recSize;

      if (
        category === 'tshirt' ||
        category === 'shirt' ||
        category === 'dress'
      ) {
        params.push(0);

        if (gender === 'M') {
          params.push(1);
        } else {
          params.push(2);
        }

        const py = spawn('python', params);

        py.stdout.on('data', data => {
          let sizeFound = false;
          let whichSize = 0;
          chestWidth = parseFloat(data.toString().slice(1, 6));

          while (!sizeFound) {
            if (whichSize === newSizesArray.length) {
              break;
            }
            if (chestWidth < newSizesArray[whichSize].chest.to) {
              recSize = newSizesArray[whichSize].size;
              sizeFound = !sizeFound;
            } else {
              whichSize += 1;
            }
          }
        });

        py.stdout.on('close', () => {
          if (!chestWidth) {
            return res.status(500).send('Server error');
          }
          console.log('Predicted chest width =', chestWidth);
          recSize ? res.json({ recSize }) : res.json({ msg: 'Size not found' });
        });

        py.stderr.on('data', data => {
          console.log(data.toString());
        });
      } else {
        params.push(1);

        if (gender === 'M') {
          params.push(1);
        } else {
          params.push(2);
        }

        const py = spawn('python', params);

        py.stdout.on('data', data => {
          let sizeFound = false;
          let whichSize = 0;
          waistCirc = parseFloat(data.toString().slice(1, 6));

          while (!sizeFound) {
            if (whichSize === newSizesArray.length) {
              break;
            }
            if (waistCirc < newSizesArray[whichSize].waist.to) {
              recSize = newSizesArray[whichSize].size;
              sizeFound = !sizeFound;
            } else {
              whichSize += 1;
            }
          }
        });

        py.stdout.on('close', () => {
          if (!waistCirc) {
            return res.status(500).send('Server error');
          }
          console.log('Predicted waist circumference =', waistCirc);
          recSize ? res.json({ recSize }) : res.json({ msg: 'Size not found' });
        });

        py.stderr.on('data', data => {
          console.log(data.toString());
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
