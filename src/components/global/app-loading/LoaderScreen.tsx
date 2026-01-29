import Lottie from "lottie-react";
import lottieFile from "../../../assets/lottie/loading.json";

const LoaderScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center auth-form-container z-50">
      <Lottie
        animationData={lottieFile}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default LoaderScreen;
