import React, {useState} from 'react';
import './App.css';
import styled from 'styled-components';
import Dropdown from './components/Dropdown';
import useGetCurrency from './hooks/useGetCurrency';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const ContainedStyle = styled.div`
  margin: 15%;  
  .refresh {
    color: #356cff;
    font-weight: 500;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    svg {
      margin-left: 5px;
    }
  }
  .exchange-form {
    margin-top:20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .switch {
        cursor: pointer;
        background-color: rgb(26 86 219/1);
        font-weight: 500;
        text-align: center;
        color: rgb(255 255 255/1);
        font-size: .875rem;
        padding-bottom: .625rem;
        padding-top: .625rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        border-radius: .5rem;
        outline: none;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover {
            background-color: rgb(30 66 159/1);
        }
        .size-6 {
            width: 16px;
        }
    }
    .item {
      display: flex;
      align-items: center;
      input[type=number] {
        width: 100%;
        margin-right: 10px;
        color: rgb(17 24 39/1);
        font-size: .875rem;
        padding: .625rem;
        background-color: rgb(249 250 251/1);
        border-width: 1px;
        border-radius: .5rem;
      }
    }
  }
`

function App() {
  const { currency, handleGetCurrency } = useGetCurrency()
  const [defaultFirst, setDefaultFirst] = useState({
    name: 'USD',
    icon: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USD.svg',
    price: 1
  })
  const [defaultSecond, setDefaultSecond] = useState({
    name: 'BLUR',
    icon: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BLUR.svg',
    price: 0.20811525423728813
  })
  const [firstPrice, setFirstPrice] = useState(0)
  const [secondPrice, setSecondPrice] = useState(0)
  return (
    <>
    <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
          />
    <ContainedStyle>
      <div onClick={() => {handleGetCurrency()}} className='refresh'>
        Refresh
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width='18px'>
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </div>
      <div className='exchange-form'>
        <div className='item'><input  onChange={(e) => {
          setSecondPrice((parseFloat(e.target.value)*defaultFirst.price)/defaultSecond.price)
          setFirstPrice((parseFloat(e.target.value)))
        }} defaultValue={0} value={firstPrice} type='number' />
        <Dropdown onChange={(value) => {
          setDefaultFirst(value)
          setSecondPrice((firstPrice*value.price)/defaultSecond.price)
        }} data={currency} defaultValue={defaultFirst} /></div>
        <button onClick={() => {
          const first = defaultFirst
          const second = defaultSecond
          setDefaultFirst(second)
          setDefaultSecond(first)
          const priceFirst = firstPrice
          const priceSecond = secondPrice
          setFirstPrice(priceSecond)
          setSecondPrice(priceFirst)
        }} className='switch'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
</svg>

        </button>
        <div className='item'><input defaultValue={0} value={secondPrice} type='number' onChange={(e) => {
          setFirstPrice((parseFloat(e.target.value)*defaultSecond.price)/defaultFirst.price)
          setSecondPrice((parseFloat(e.target.value)))
        }} />
        <Dropdown onChange={(value) => {
          setDefaultSecond(value)
          setFirstPrice((secondPrice*value.price)/defaultFirst.price)
        }} data={currency} defaultValue={defaultSecond} /></div>
      </div>
    </ContainedStyle>
    </>
  );
}

export default App;
