
interface LoginHeaderProps {
  // No props needed for now
}

const LoginHeader = ({}: LoginHeaderProps) => {
  return (
    <div className="text-center mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mx-auto mb-3">
        <span className="text-white font-bold text-lg">B</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
        Bambinos.live
      </h1>
      <p className="text-gray-600">
        Welcome back! Please sign in
      </p>
    </div>
  );
};

export default LoginHeader;
