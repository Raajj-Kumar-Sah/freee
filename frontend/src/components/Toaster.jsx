import { Toaster } from 'react-hot-toast';

const ToasterComponent = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      className: '',
      duration: 4000,
      style: {
        background: '#363636',
        color: '#fff',
      },
      success: {
        duration: 3000,
        theme: {
          primary: '#4ade80',
          secondary: '#ffffff',
        },
      },
      error: {
        duration: 5000,
        theme: {
          primary: '#ef4444',
          secondary: '#ffffff',
        },
      },
    }}
  />
);

export default ToasterComponent;

