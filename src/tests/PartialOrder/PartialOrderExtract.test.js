import PartialOrder from '../../PartialOrder';

describe("PartialOrder extractItem", () => {
  it('returns key and the rest in an array', () => {
    expect(PartialOrder.extractItem(['A','B','C'], 'A'))
      .toEqual(['A',['B','C']]);
  });

  it('original embedded in array if key not found', () => {
    expect(PartialOrder.extractItem(['A','B','C'], 'D'))
      .toEqual([['A','B','C']]);
  });
});
