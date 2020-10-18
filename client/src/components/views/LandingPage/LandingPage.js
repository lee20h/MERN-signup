import React, { useEffect } from 'react';
import axios from 'axios';


function LandingPage(props) {

    useEffect(() => {
        axios.get('http://localhost:5000/api/hello')
        .then(response => console.log(response));
    }, [])

    const onClickHandler = () => {
        axios.get('http://localhost:5000/logout', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if(res.data.success) {
                    props.history.push('/login')
                } else {
                    alert('로그아웃 실패')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage
