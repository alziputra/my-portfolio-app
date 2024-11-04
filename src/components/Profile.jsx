import PropTypes from "prop-types";

const Profile = ({ name, bio, imageUrl }) => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <img src={imageUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-400 text-sm">{bio}</p>
    </div>
  );
};

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Profile;
