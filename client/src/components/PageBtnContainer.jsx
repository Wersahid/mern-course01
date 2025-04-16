// configuracion y funcionamiento de los button prev, next de alljobs
import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
    const { data: {numOfPages, currentPage} } = useAllJobsContext();

    // const pages = Array.from({ length: numOfPages }, (_, index) => {
    //    return index + 1
  
    // });
  
  const {search, pathname} = useLocation();
  const  navigate = useNavigate();
  //console.log(search,pathname);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page',pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`); // <-----  un espacio dentro de navigate y hace que tengamos errores 
  };

  const addPageButton =({pageNumber, activeClass}) => {
    return (
      <button 
          className={`btn page-btn ${activeClass && 'active'}`}
          key={pageNumber} 
          onClick={() => handlePageChange(pageNumber)} >
           { pageNumber }
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButttons = [];
    // first page
    pageButttons.push(addPageButton({pageNumber:1, activeClass:currentPage === 1}));

    // dots
    if(currentPage > 3){
      pageButttons.push(
        <span className='page-btn dots' key='dots-1'>
          ...
        </span>
      );
    };
    // one before current page
    if(currentPage !== 1 && currentPage !== 2){
      pageButttons.push(addPageButton({ pageNumber:currentPage -1 , activeClass:false }));
    };
    

    //current page
    if(currentPage !== 1 && currentPage !== numOfPages){
      pageButttons.push(addPageButton({ pageNumber:currentPage, activeClass:true }));
    };

    // one after current page
    if(currentPage !== numOfPages && currentPage !== numOfPages - 1){
      pageButttons.push(addPageButton({ pageNumber:currentPage + 1 , activeClass:false }));
    };

    // dots 2
    if(currentPage < numOfPages - 2){
      pageButttons.push(
        <span className='page-btn dots' key='dots+1'>
          ...
        </span>
      );
    };    
    

    pageButttons.push(addPageButton({pageNumber:numOfPages, activeClass:currentPage === numOfPages}));

    return pageButttons;
  }

  return (
    <Wrapper>
        <button className='btn prev-btn' onClick={() => {
            let prevPage = currentPage - 1;
            if(prevPage < 1) prevPage = numOfPages;
            handlePageChange(prevPage);
        }}>
            <HiChevronDoubleLeft />
            prev
        </button>
        <div className="btn-container">
           {renderPageButtons()}
        </div>
        <button className='btn next-btn' onClick={() => {
            let nextPage = currentPage + 1;
            if(nextPage > numOfPages) nextPage = 1;
            handlePageChange(nextPage);
        }}>
            next
            <HiChevronDoubleRight />            
        </button>
    </Wrapper>
  )
}




export default PageBtnContainer