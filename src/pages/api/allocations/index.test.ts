import axios from 'axios'
import { createServer } from 'http'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import listen from 'test-listen'

import AllocationsApiHandler from './index'
import {
  complexInput1,
  complexInput2,
  complexOutput1,
  complexOutput2,
  simpleInput1,
  simpleInput2,
  simpleOutput1,
  simpleOutput2,
} from '../../../../test/__mocks__'

// Ensure the /api/allocations handler returns same response from provided input/output samples

describe('/api/allocations', () => {
  let server = null,
    serverUrl = null,
    i = 1

  beforeAll(async () => {
    serverUrl = await listen(
      (server = createServer((req, res) => {
        void apiResolver(req, res, {}, AllocationsApiHandler, undefined, true)
      }))
    )
  })

  new Array(
    { input: simpleInput1, output: simpleOutput1 },
    { input: simpleInput2, output: simpleOutput2 },
    { input: complexInput1, output: complexOutput1 },
    { input: complexInput2, output: complexOutput2 }
  ).forEach(({ input, output }, i) => {
    test(`POST sample input ${i + 1} returns sample output ${i + 1} as JSON response`, async () => {
      expect.assertions(1)
      try {
        const response = await axios.post(serverUrl, input)
        expect(response.data).toStrictEqual(output)
      } finally {
      }
    })
  })

  test(`investments don't exceed requested amounts`, async () => {
    expect.assertions(complexInput1.investor_amounts.length)
    try {
      const response = await axios.post(serverUrl, complexInput1)
      complexInput1.investor_amounts.forEach(({ name, requested_amount }) =>
        expect(response.data[name]).toBeLessThanOrEqual(requested_amount)
      )
    } finally {
    }
  })

  test(`no investment is left unused if investor wants it`, async () => {
    expect.assertions(1)
    try {
      const response = await axios.post(serverUrl, complexInput2)
      const investorA = complexInput2.investor_amounts.find(({ name }) => name === 'Investor A')
      expect(response.data['Investor A']).toBeGreaterThanOrEqual(investorA.average_amount)
    } finally {
    }
  })

  test('all investor name(s) are included in the allocation', async () => {
    expect.assertions(complexInput2.investor_amounts.length)
    try {
      const response = await axios.post(serverUrl, complexInput2)
      complexInput2.investor_amounts.forEach(({ name }) => {
        expect(response.data[name]).toBeTruthy()
      })
    } finally {
    }
  })

  server?.close()
})
