import Login from './Login';

const mockEmit = (event: string, detail: Record<string, unknown>) => {
  console.log('[mf-login dev] Event:', event, detail);
};

export default function App() {
  return <Login emit={mockEmit} />;
}
