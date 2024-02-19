import { login, signup } from '../services/auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should handle successful login', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve({}) };
      global.fetch.mockResolvedValueOnce(mockResponse);

      const response = await login('testuser', 'password');

      expect(response).toEqual({});
    });

    it('should handle failed login', async () => {
      const mockResponse = { ok: false, json: () => Promise.resolve({ message: 'Login failed' }) };
      global.fetch.mockResolvedValueOnce(mockResponse);

      const response = await login('testuser', 'password');

      expect(response.message).toEqual('Login failed');
    });

    it('should handle network error during login', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const response = await login('testuser', 'password');
      expect(response).toEqual(undefined);
    });
  });

  describe('signup', () => {

    it('should handle failed signup', async () => {
      const mockResponse = { ok: false, json: () => Promise.resolve({ message: 'Signup failed' }) };
      global.fetch.mockResolvedValueOnce(mockResponse);

      const response = await signup('test user', 'testuser', 'test@email.com', 'password');

      expect(response.message).toEqual('Signup failed');
    });

    it('should handle network error during signup', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const response = await signup('test user', 'testuser', 'test@email.com', 'password');

      expect(response).toEqual(undefined);
    });
  });
});
