import { faker } from '@faker-js/faker';
// utils
import { mockImgCapitol } from '../utils/mockImages';
//
import capitoleDB from './CapitolDB';

// ----------------------------------------------------------------------

const capitole = capitoleDB.map((_, index) => {
  const setIndex = index + 1;
  console.log('capitole', capitoleDB);
  return {
    id: capitoleDB._id,
    titlu: capitoleDB.titlu,
    clasa: capitoleDB.clasa,
    cover: mockImgCapitol(setIndex)
  };
});

export default capitole;
