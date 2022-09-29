# 그립 컴퍼니 기업과제 movie-app   

> 기존에 있었던 무한스크롤 오류를 다른 라이브러리를 통해 수정하였고, 전역상태 관리를 위해 사용하던 recoil을 redux-toolkit으로 대체하였습니다. 



1. 기능   
- 영화 검색  
- 영화 즐겨찾기 및 조회   
- 무한 스크롤로 추가 데이터 조회   


2. 기능 구현 과정   
 - 영화 검색과 무한 스크롤    
 axios로 api를 콜해서 데이터가 있으면 띄우고, react-intersection-observer와 react-query를 사용해서 스크롤을 할 때마다 새로운 데이터를 불러올 수 있게 하였습니다. 그리고 unmount시에 검색어를 초기화하여 페이지를 이동할때마다 데이터를 reset할 수 있도록 하였습니다. 검색 결과가 없는 경우 검색 결과가 없다는 메세지를 추가하였습니다.   
    
 - 영화 조회와 즐겨찾기    
 영화 검색 이후에 영화 정보들은 movieItem이라는 컴포넌트에 담았고, 해당 영화를 클릭하면 즐겨찾기에 추가할 수 있는 모달창을 띄울 수 있게 하였습니다.    

 - 즐겨찾기 저장   
  창을 닫고 다시 들어와도 즐겨찾기 목록을 계속 조회할 수 있도록 하기 위해 storeJs를  사용하였습니다. localStorage에 키값이 아예 없는 경우, 있는 경우를 나눠서 저장할 수 있도록 했습니다.   
     
 - 즐겨찾기 순서 바꾸기       
 드래그를 통해 즐겨찾기의 순서를 바꾸는 기능을 구현하고자 했습니다. dragStart를 통해 현재 클릭한 영화의 인덱스를 저장하고, dragEnter를 통해 위치를 바꾸고 싶은 아이템의 인덱스를 조회하고 드롭을 하면 순서를 바꾸고, 그 배열을 localStroage에 다시 저장하도록 하였습니다.   
    

 3.Dependencies
- redux-toolkit : 전역 상태 관리를 위해 사용하였습니다.      
- react-query : api를 불러오고, 데이터를 캐싱하기 위해 사용하였습니다.   
- react-intersection-observer : 무한 스크롤로 데이터를 불러 오기 위해 사용하였습니다.   
- storeJs : localStorage에 있는 즐겨찾기 목록을 관리하기 위해 사용하였습니다.    

4. Usage Example

- search
![search](https://user-images.githubusercontent.com/88841429/190107394-89dd422f-ca02-4566-ab80-a6d2a592e8ec.gif)

- favorites
![favorites](https://user-images.githubusercontent.com/88841429/190107382-95a43c30-82a6-4551-a83f-dd41092179e7.gif)

- favoriteList
![favoritelist](https://user-images.githubusercontent.com/88841429/190107082-46bb2392-b128-48b1-8d6a-52adc990b4c6.gif)

- infinite scroll
![scroll](https://user-images.githubusercontent.com/88841429/190107392-00848505-be4c-482b-b29f-79d229ebf482.gif)   

5. 추가 수정 사항
- 드래그앤 드롭 애니메이션 (진행중)