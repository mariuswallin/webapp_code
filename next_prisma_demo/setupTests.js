import '@testing-library/jest-dom/extend-expect'
import { server } from './__mocks__/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
