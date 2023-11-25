import { TimeFromNowFormatPipe } from './time-from-now-format.pipe';

describe('TimeFromNowFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFromNowFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
