import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Loading from './Loading';
import ApiCard from "./ApiCard";
import { useState, useEffect } from 'react';

function ApiList({apis, count}) {
  const breakpoints = (width) => {
    if(width < 600) {
      return 'xs';
    } else if(width >= 600 && width < 900 ) {
      return 'sm';
    } else if(width >= 900 && width < 1200) {
      return 'md';
    } else if(width >= 1200) {
      return 'lg';
    }
  }
  
  const [breakpoint, setBreakpoint] = useState(() => breakpoints(typeof window !== 'undefined' && (window.innerWidth)));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const calcInnerWidth = function() {
        setBreakpoint(breakpoints(window.innerWidth))
      }
      window.addEventListener('resize', calcInnerWidth)
      return () => window.removeEventListener('resize', calcInnerWidth)
    }
  }, [])

  const [apiAmount, setApiAmount] = useState(breakpoint)

  useEffect(() => {
    if(breakpoint === "xs" || breakpoint === "sm") {
      setApiAmount(6)
    } else if (breakpoint === "md") {
      setApiAmount(8)
    } else if(breakpoint === "lg") {
      setApiAmount(9)
    }
  }, [breakpoint])

  const onSeeMore = () => {
    if(apiAmount >= apis.length) {
      if(breakpoint === "xs") {
        setApiAmount(6)
      } else if (breakpoint === "md") {
        setApiAmount(8)
      } else if(breakpoint === "lg") {
        setApiAmount(9)
      }
    } else {
      if(breakpoint === "xs" || breakpoint === "sm") {
        setApiAmount(apiAmount + 6)
      } else if (breakpoint === "md") {
        setApiAmount(apiAmount + 8)
      } else if(breakpoint === "lg") {
        setApiAmount(apiAmount + 9)
      }
    }
  }

  return (
    <>
      {apis && (
        <Typography sx={{marginBottom: '10px'}}>
          APIs found: {apis.length}
        </Typography>
      )}
      {apis ? (
        <div style={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              borderRadius: 1,
            }}
          >
            {apis.slice(0, apiAmount).map((api, index) => (
              <ApiCard api={api} key={index} />
            ))}

            <Box sx={{ width: '100%', textAlign: 'center' }}>
              {apiAmount >= apis.length ? ( 
                apis.length > 16 && (
                  <Typography 
                    sx={{
                      marginTop: '20px'
                    }}
                  >
                    You have reached the end...
                  </Typography>
                )
              ) : (
                <Button
                  sx={{
                    marginTop: '20px',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                  }}
                  variant="outlined"
                  onClick={onSeeMore}
                >
                  Show more
                </Button>
              )}
            </Box>
          </Box>
        </div>
      ) : (
        count === 0 ? (
          <Box sx={{ textAlign: 'center'}}>
            <img src='/images/empty.svg' alt='empty' />
            <Typography variant="h5" component="h4">No results...</Typography>
            <Typography>Try searching for something else</Typography>
          </Box>
        ) : (
          <Loading />
        )
      )}
    </>
  );
}

export default ApiList;