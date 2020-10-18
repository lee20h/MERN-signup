import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'


export default function (SpecificComponent, option, adminRoute = null) {
    // SpecificComponent : 컴포넌트 자체

    // option : null => 아무나 출입 가능
    // true => 로그인 유저만 출입가능
    // false => 로그인 유저 출입불가

    // adminRoute : 관리자만 출입

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth())
                .then(res => {
                    console.log(res);
                    // 로그인 안한 상태
                    if(!res.payload.isAuth) {
                        if(option) {
                            props.history.push('/login');
                        }
                    } else {
                        // 로그인 한 상태
                        if(adminRoute && !res.payload.isAdmin) {
                            props.history.push('/');
                        } else {
                            if(!option) { // 로그인 한 경우 접근 불가
                                props.history.push('/');
                            }
                        }
                    }
                });
            
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck;
}