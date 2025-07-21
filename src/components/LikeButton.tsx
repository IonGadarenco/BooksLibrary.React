import { useState } from 'react';
import { IconButton, Typography, Box, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useApi } from '../api/axiosInstance';
import type { ToggleLikeResultDto } from '../types/toggleLikeResultDto';
import { BOOK_ENDPOINTS } from '../api/endpoints';

interface LikeButtonProps {
  bookId: number;
  initialLikeCount: number;
  initialUserHasLiked: boolean;
}

export default function LikeButton({
  bookId,
  initialLikeCount,
  initialUserHasLiked,
}: LikeButtonProps) {
  const api = useApi();

  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [userHasLiked, setUserHasLiked] = useState(initialUserHasLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await api.post<ToggleLikeResultDto>(BOOK_ENDPOINTS.TOGGLE_LIKE(bookId));

      setLikeCount(response.data.newLikeCount);
      setUserHasLiked(response.data.userHasLiked);
    } catch (error) {
      console.error('Failed to toggle like', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <IconButton onClick={handleLikeToggle} disabled={isLoading} sx={{ p: 0.5 }}>
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : userHasLiked ? (
          <FavoriteIcon color="error" /> 
        ) : (
          <FavoriteBorderIcon /> 
        )}
      </IconButton>
      <Typography variant="body1" fontWeight="bold">
        {likeCount}
      </Typography>
    </Box>
  );
}