"use client"
import styles from "./login.module.css";
import { useState } from "react";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { CgSpinner } from "react-icons/cg";
import { auth } from "@/app/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import animationData from "@/assets/DeliveryAnimation.json";
import animationData3 from "@/assets/Animation3.json";

const Login = () => {
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState(false);
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup();
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }, auth);
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);
        setLoading(false);
        // Redirect to home page after successful login
        
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid OTP. Please enter the correct OTP.");
        setLoading(false);
        setOtp('');
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.top}>
          <h1 className={styles.h1}>WeeWee</h1>
          <h2 className={styles.h2}>Delivery</h2>
        </div>
        <Lottie className={styles.animation} animationData={animationData3} />
      </div>
      <div className={styles.right}>
        {user ? (
          window.location.href = "/"
        ) : (
          <div className={styles.box}>
            <Toaster toasterOptions={{ duration: 4000 }} />
            <div id="recaptcha-container"></div>
            {showOTP ? (
              <div className={styles.otpContainer}>
                <h4 className={styles.otpH4}>
                  Veuillez entrer<br />le code de sécurité
                </h4>
                <OtpInput
                  className={styles.otpinput}
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                />
                <p className={styles.otpP}>Le code arrive par SMS au +{ph},<br />entrez-le ci-dessus</p>
                <button onClick={onOTPVerify} className={styles.phoneButton}>
                  {loading && <CgSpinner size={20} className={`${styles.spinner} animate-spin`} />}
                  <span>Vérifier</span>
                </button>
              </div>
            ) : (
              <div className={styles.phoneContainer}>
                <h1 className={styles.phoneH1}>Se Connecter</h1>
                <h4 className={styles.phoneH4}>Entrez votre numéro de téléphone</h4>
                <PhoneInput
                  className={styles.phoneInput}
                  country={'dz'} // Définir le pays sur l'Algérie
                  value={ph}
                  onChange={setPh}
                  placeholder="770454948" // Texte de l'indication
                  inputProps={
                    { 
                      maxLength: 16,
                      style: { 
                        fontSize: '19px', // Définir la taille de la police
                        backgroundColor: 'inherit',
                        border: 'none'
                      } 
                    }
                  }
                  
                  disableDropdown={true} // Désactiver le menu déroulant du choix du pays
                  showCountrySelect={false} // Ne pas afficher le choix du pays
                  showCountryFlags={true} // Afficher les drapeaux des pays
                  countryCodeEditable={false} // Activer la modification du code de pays
                />


                <button onClick={onSignup} className={styles.phoneButton}>
                  {loading && <CgSpinner size={20} className={`${styles.spinner} animate-spin`} />}
                  <span>Envoyer</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
