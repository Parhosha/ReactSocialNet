import React from 'react';
import { create } from 'react-test-renderer';
import PostRemark from '../Posts/Post/PostRemark';

describe('b comp', () => {
  test('sho exp click(trstrongs..!)', () => {
    const comp = create(<PostRemark status="Test Status" />);
    const instnce = comp.getInstance();
    expect(instnce.state.status).toBe('Test Status');
  });
});
