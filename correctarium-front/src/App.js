import Footer from './components/Footer/Footer';
import Section from './components/Section/Section';
import Order from './components/Order/Order.jsx';
import './App.css';

function App() {
  return (
    <div>
      <Section>
        <Order />
      </Section>
      <Footer />
    </div>
  );
}

export default App;
