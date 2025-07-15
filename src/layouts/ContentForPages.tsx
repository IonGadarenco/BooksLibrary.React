import { Box } from "@mui/material";
import React from 'react';

interface ContentForPagesProps {
  children: React.ReactNode;
}

const ContentForPages: React.FC<ContentForPagesProps> = ({children}) => {

  return (
    <Box sx={{ py: { xs: 8, sm: 10, md: 12 } }}>
      {children}
    </Box>
  );
};

export default ContentForPages;
