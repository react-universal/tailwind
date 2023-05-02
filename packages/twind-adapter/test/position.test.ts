import { describe, expect, it } from 'vitest';
import { initialize, stringify } from '../src';

const { tw, tx } = initialize({});

describe('TailwindCSS Position', () => {
  beforeEach(() => {
    tw.clear();
  });

  it('Right', () => {
    const classNames = tx('right-3');
    expect(classNames).toStrictEqual('right-3');
    expect(stringify(tw.target)).toStrictEqual('/*!dbgidc,y,right-3*/.right-3{right:12px}');
  });

  it('Left', () => {
    const classNames = tx('left-3');
    expect(classNames).toStrictEqual('left-3');
    expect(stringify(tw.target)).toStrictEqual('/*!dbgidc,y,left-3*/.left-3{left:12px}');
  });

  it('Top', () => {
    const classNames = tx('top-3');
    expect(classNames).toStrictEqual('top-3');
    expect(stringify(tw.target)).toStrictEqual('/*!dbgidc,y,top-3*/.top-3{top:12px}');
  });

  it('Bottom', () => {
    const classNames = tx('bottom-3');
    expect(classNames).toStrictEqual('bottom-3');
    expect(stringify(tw.target)).toStrictEqual('/*!dbgidc,y,bottom-3*/.bottom-3{bottom:12px}');
  });

  it('Inset', () => {
    const classNames = tx('inset-3');
    expect(classNames).toStrictEqual('inset-3');
    expect(stringify(tw.target)).toStrictEqual(
      '/*!dbgidc,s,inset-3*/.inset-3{top:12px;right:12px;bottom:12px;left:12px}',
    );
  });

  it('Negative Inset', () => {
    const classNames = tx('-inset-3');
    expect(classNames).toStrictEqual('-inset-3');
    expect(stringify(tw.target)).toStrictEqual('/*!dbgidc,s,-inset-3*/.-inset-3{top:-12px}');
  });

  it('Inset Y', () => {
    const classNames = tx('inset-y-3');
    expect(classNames).toStrictEqual('inset-y-3');
    expect(stringify(tw.target)).toStrictEqual(
      '/*!dbgidc,w,inset-y-3*/.inset-y-3{top:12px;bottom:12px}',
    );
  });

  it('Negative Inset Y', () => {
    const classNames = tx('-inset-y-3');
    expect(classNames).toStrictEqual('-inset-y-3');
    expect(stringify(tw.target)).toStrictEqual(
      '/*!dbgidc,w,-inset-y-3*/.-inset-y-3{top:-12px}',
    );
  });

  it('Negative Inset X', () => {
    const classNames = tx('-inset-x-3');
    expect(classNames).toStrictEqual('-inset-x-3');
    expect(stringify(tw.target)).toStrictEqual(
      '/*!dbgidc,w,-inset-x-3*/.-inset-x-3{right:-12px}',
    );
  });

  it('Inset X', () => {
    const classNames = tx('inset-x-3');
    expect(classNames).toStrictEqual('inset-x-3');
    expect(stringify(tw.target)).toStrictEqual(
      '/*!dbgidc,w,inset-x-3*/.inset-x-3{right:12px;left:12px}',
    );
  });
});
