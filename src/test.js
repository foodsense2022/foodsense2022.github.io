import { useEffect, useState } from 'react';
import API from './API/api';

async function Test() {
  const makeAPICall = async () => {
    try {
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])
  return (
    <div>
      <h1>React Cors Guide</h1>
    </div>
  );
}
export default Test;