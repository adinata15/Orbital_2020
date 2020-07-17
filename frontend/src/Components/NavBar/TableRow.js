import React from 'react';

const TableRow = (props) => {
  return props.sizeData.map((val, idx) => {
    let size = `size${idx}`,
      chest = `size${idx}chest`,
      bl = `size${idx}bl`,
      waist = `size${idx}waist`,
      hip = `size${idx}hip`,
      tl = `size${idx}tl`,
      bust = `size${idx}bust`,
      sl = `size${idx}sl`;
    return (
      <tr key={val.index}>
        <td className={'border px-4 py-2'}>
          <input
            className='w-full'
            type='text'
            name='size'
            data-id={idx}
            id={size}
            onChange={(e) => props.handleChange(e)}
          />
        </td>
        <td className={'border px-4 py-2'}>
          <input
            className='w-full'
            type='number'
            name='chest'
            id={chest}
            data-id={idx}
            onChange={(e) => props.handleChange(e)}
          />
        </td>
        <td className={'border px-4 py-2'}>
          <input
            className='w-full'
            type='number'
            name='bl'
            id={bl}
            data-id={idx}
            onChange={(e) => props.handleChange(e)}
          />
        </td>
        <td className={'border px-4 py-2'}>
          <input
            className='w-full'
            type='number'
            name='waist'
            id={waist}
            data-id={idx}
            onChange={(e) => props.handleChange(e)}
          />
        </td>
        <td className={'border px-4 py-2'}>
          <input
            className='w-full'
            type='number'
            name='hip'
            id={hip}
            data-id={idx}
            onChange={(e) => props.handleChange(e)}
          />
        </td>
        <td className={'border px-4 py-2'}>
          <input
            className='w-full'
            type='number'
            name='tl'
            id={tl}
            data-id={idx}
            onChange={(e) => props.handleChange(e)}
          />
        </td>
        <td className={'border px-4 py-2'}>
          <input
            className='w-full'
            type='number'
            name='bust'
            id={bust}
            data-id={idx}
            onChange={(e) => props.handleChange(e)}
          />
        </td>
        <td className={'border px-4 py-2'}>
          <input
            className='w-full'
            type='number'
            name='sl'
            id={sl}
            data-id={idx}
            onChange={(e) => props.handleChange(e)}
          />
        </td>
        <td className={'border px-4 py-2'}>
          {idx === 0 ? (
            <button onClick={() => props.add()} type='button'>
              Add
              <i aria-hidden='true'></i>
            </button>
          ) : (
            <button onClick={() => props.delete(val)}>
              Delete
              <i aria-hidden='true'></i>
            </button>
          )}
        </td>
      </tr>
    );
  });
};
export default TableRow;
