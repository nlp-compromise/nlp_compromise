const test = require('tape')
const nlp = require('../_lib')

test('text(normal):', function(t) {
  let arr = [
    ['he is good', 'he is good'],
    ['Jack and Jill went up the hill.', 'jack and jill went up the hill.'],
    ['Mr. Clinton did so.', 'mr clinton did so.'],
    ['he is good', 'he is good'],
    ['Jack and Jill   went up the hill. She got  water.', 'jack and jill went up the hill. she got water.'],
    ['Joe', 'joe'],
    ['just-right', 'just right'],
    ['camel', 'camel'],
    ['4', '4'],
    ['four', 'four'],
    ['john smith', 'john smith'],
    ['Dr. John Smith-McDonald', 'dr john smith mcdonald'],
    ['Contains no fruit juice. \n\n All rights reserved', 'contains no fruit juice. all rights reserved'],
  ]
  arr.forEach(function(a) {
    const str = nlp(a[0]).text('normal')
    t.equal(str, a[1], a[0])
  })
  t.end()
})

test('text is consistent', function(t) {
  const str = `My dog loves Pizza, and grapes!!`
  let doc = nlp(str)

  t.equal(doc.json({ text: true })[0].text, str, 'json(text)')

  t.equal(doc.text('text'), str, 'text(text): ')

  t.end()
})

test('normal is consistent', function(t) {
  let doc = nlp(`My dog loves Pizza, and grapes!!`)
  const str = 'my dog loves pizza, and grapes!'

  t.equal(doc.json({ normal: true })[0].normal, str, 'json(normal)')

  t.equal(doc.text('normal'), str, 'text(normal): ')

  doc.normalize()
  t.equal(doc.text('text'), str, 'normalize():  ')

  t.end()
})

test('reduced is consistent', function(t) {
  let doc = nlp(`My dog loves Pizza, and grapes!!`)
  const str = 'my dog loves pizza and grapes'

  t.equal(doc.json({ reduced: true })[0].reduced, str, 'json(reduced)')

  t.equal(doc.text('reduced'), str, 'text(reduced): ')

  doc.normalize('reduced')
  t.equal(doc.text('reduced'), str, 'normalize(reduced):  ')

  t.end()
})

test('root is consistent', function(t) {
  let doc = nlp(`My dog loves Pizza, and grapes!!`)
  const str = 'my dog love pizza and grape'

  t.equal(doc.json({ root: true })[0].root, str, 'json(root)')

  t.equal(doc.text('root'), str, 'text(root): ')

  doc.normalize('root')
  t.equal(doc.text('root'), str, 'normalize(root):  ')

  t.end()
})
