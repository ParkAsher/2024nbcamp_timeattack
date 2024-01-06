## 프로잭트 개요

스파르타 내일배움캠프 타임어택 해커톤

E-Commerce 뿐만아니라 인터넷 환경에서 제공되는 수 많은 서비스의 가장 기본적인 기능인
로그인 / 회원가입 기능을 구현하는 것.

## 구현하며 중요하게 생각했던 점

타입스크립트를 사용하는 NestJS 의 장점인 데이터의 타입체크를 통한 유효성 검사를 우선적으로 중요하게 생각하였다.

Access Token 만을 사용하여 로그인을 처리하면 토큰 자체에 payload 를 가지고 있으므로 탈취를 당할 경우,
계정의 주인은 서비스를 사용하지 못하게 될 수 있다.
따라서 Access Token 의 만료 시간을 짧게 주고, 만료 시간이 긴 Refresh Token 을 사용하여 재발급을 받을 수 있도록
로직을 구현하였다. Refresh Token 은 payload 를 가지고 있지 않아 안전성이 좋다.

역할에 맞게 구조를 나누어 리팩토링에 용이하게 구현하려고 노력하였으며,
코드의 중복을 줄이기 위해 노력하였다.

## ERD
![121221](https://github.com/ParkAsher/2024nbcamp_timeattack/assets/111232061/2d21f997-05ba-4d16-a0cb-27b3cae753a3)


## API
(swagger) http://localhost:3001/api
