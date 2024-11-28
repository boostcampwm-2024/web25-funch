import RecommendedLives from './features/RecommendedLives';
import FollowingLives from './features/FollowingLives';

const HomePage = () => {
  return (
    <section className="min-h-home w-full px-7">
      <FollowingLives />
      <RecommendedLives />
    </section>
  );
};

export default HomePage;
