# 그립 컴퍼니 기업과제 movie-app   

1. 기능   
- 영화 검색  
- 영화 즐겨찾기 및 조회   
- 무한 스크롤로 추가 데이터 조회   


2. 기능 구현 과정   
 - 영화 검색   
 axios로 api를 불러와서 데이터가 있으면 movieList라는 recoil state에 업도드를 시켜줄 수 있도록 하였습니다. 그리고 새로운 데이터를 검색할때 마다 state를 reset시켜주었습니다.    
    
 - 영화 조회와 즐겨찾기   
  영화 검색 이후에 영화의 정보들을 movieItem이라는 컴포넌트에 담고, 스크롤을 내리면 기존의 검색 정보를 가지고 있던 movieList를 업데이트 시키면서, 새로운 정보를 불러와도 앞서 불러온 정보를 계속 조회할 수 있도록 하였습니다. 또한 영화 즐겨찾기 기능을 위한 모달창을 createPortal을 통해 만들었습니다. 모달창을 클릭하면 클릭한 영화의 정보를 selectedInfo라는 recoil state에 업로드를 하여, 즐겨찾기 목록에 추가할 수 있도록 하였습니다.    
     
  - 무한 스크롤   
  무한 스크롤을 위해 영화 아이템들을 담고 있는 ul의 scrollTop과 scrollHeight를 이용했습니다. 스크롤이 끝에 갔다고 인식을 하면, api를 불러오는 함수에 페이지를 추가해서 다음 데이터를 불러올 수 있도록 했습니다. 처음에 데이터를 조회했을 때 나오는 totalResults를 10으로 나눈 값과 현재 페이지 카운트 수를 비교해서 현재 페이지 숫자가 총 결과 페이지보다 같거나 크면 검색 결과가 더 이상 없다는 메세지를 띄울 수 있게 하였습니다.   
     
 - 즐겨찾기 저장   
  창을 닫고 다시 들어와도 즐겨찾기 목록을 계속 조회할 수 있도록 하기 위해 storeJs를  사용하였습니다. localStorage에 키값이 아예 없는 경우, 있는 경우를 나눠서 저장할 수 있도록 했습니다. 즐겨찾기 목록을 관리하기 위한 recoil state를 따로 만들어서 실시간으로 즐겨찾기를 제거하고 추가하는 것이 가능하게 했습니다.    
     
 - 즐겨찾기 순서 바꾸기     
 드래그를 통해 즐겨찾기의 순서를 바꾸는 기능을 구현하고자 했습니다. dragStart를 통해 현재 클릭한 영화의 인덱스를 저장하고, dragOver을 통해 위치를 바꾸고 싶은 아이템의 인덱스를 조회하고 드롭을 하면 위치를 바꾸고, 순서가 바뀐 배열을 localStroage에 다시 넣어주었습니다.   
    

 3.Dependencies
- recoil : 전역 상태 관리를 위해 사용하였습니다.   
- storeJs : localStorage에 있는 즐겨찾기 목록을 관리하기 위해 사용하였습니다.   

4. Usage Example

- search
<img src="search.gif" width="500px" alt="search function usage" title="search example" />

- favorites
<img src="favorites.gif" width="500px" alt="add favorites function usage" title="favorites example" />

- favoriteList
<img src="favoritelist.gif" width="500px" alt="favorite list function usage" title="favorite list example" />

- infinite scroll
<img src="scroll.gif" width="500px" alt="infinite scroll usage" title="scroll example" />
