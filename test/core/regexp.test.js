'use strict';

suite('Parsimmon.regexp', function() {

  test('general usage', function() {
    var parser = Parsimmon.regexp(/[0-9]/);

    assert.equal(parser.parse('1').value, '1');
    assert.equal(parser.parse('4').value, '4');
    assert.deepEqual(parser.parse('x0'), {
      status: false,
      index: {
        offset: 0,
        line: 1,
        column: 1
      },
      expected: ['/[0-9]/']
    });
    assert.deepEqual(parser.parse('0x'), {
      status: false,
      index: {
        offset: 1,
        line: 1,
        column: 2
      },
      expected: ['EOF']
    });
    assert.throws(function() { Parsimmon.regexp(42); });
    assert.throws(function() { Parsimmon.regexp(/a/, 'not a number'); });
  });

  test('rejects /g flag', function() {
    assert.throws(function() {
      Parsimmon.regexp(/a/g);
    });
  });

  test('has alias Parsimmon.regex', function() {
    assert.equal(Parsimmon.regex, Parsimmon.regexp);
  });

  test('supports groups', function() {
    var parser0 = Parsimmon.regexp(/(\w)(\d)/, 0);
    var parser1 = Parsimmon.regexp(/(\w)(\d)/, 1);
    var parser2 = Parsimmon.regexp(/(\w)(\d)/, 2);
    assert.equal(parser0.parse('a1').value, 'a1');
    assert.equal(parser1.parse('a1').value, 'a');
    assert.equal(parser2.parse('a1').value, '1');
  });

});
