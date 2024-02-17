import { useState } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notify = () => toast("QR Code is successfully generated!");

  const [value, setValue] = useState('');
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(256);
  const [qrCode, setQrCode] = useState(null);
  const [generated, setGenerated] = useState(false);

  function onGenerate() {
    if (value !== "") {
      setQrCode(
        <QRCode
          title={value}
          value={value}
          bgColor={back}
          fgColor={fore}
          size={size === '' ? 0 : size}
          ref={(ref) => { setQrCode(ref); }} // Add this line to set ref
        />
      );
      setGenerated(true);
    } else {
      alert("Value not mentioned");
      setQrCode(null);
      setGenerated(false);
    }
  }
  

  const downloadQRCode = () => {
    if (qrCode) {
      html2canvas(qrCode).then(canvas => { // Update this line to use qrCode ref
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'qrcode.png';
        link.click();
      });
    }
  }
  

  return (
    <div className="App">
      <center>
        <br />
        <br />
        <div className={generated ? 'container generated' : 'container'}>
          <input
            id="qr"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value of Qr-code"
          />
          <br />
          <br />
          <input
            id="qr"
            type="text"
            onChange={(e) => setBack(e.target.value)}
            placeholder="Background color"
          />
          <br />
          <br />
          <input
            id="qr"
            type="text"
            onChange={(e) => setFore(e.target.value)}
            placeholder="Foreground color"
          />
          <br />
          <br />
          <input
            id="qr"
            type="number"
            onChange={(e) =>
              setSize(parseInt(e.target.value === '' ? 0 : e.target.value, 10))
            }
            placeholder="Size of Qr-code"
          />
          <br />
          <br />
            <button
              className='my-button'
              type="submit"
              onClick={()=> { onGenerate(); notify();}}
              >
                Generate
            </button>
          <ToastContainer />

          <br />
          <br />
          <br />
        </div>
        {qrCode && (
          <div className='qr-container'>
            {qrCode}
            <br />
            <br />
            <button
              className='my-button'
              onClick={downloadQRCode}
            >
              Download QR Code
            </button>
          </div>
        )}
      </center>
    </div>
  );
}

export default App;
