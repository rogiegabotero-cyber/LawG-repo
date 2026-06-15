
import "./App.css";
import Homepage from "./pages/home_page";
import Header from "./components/header";
import Expertise from "./pages/expertise";
import AboutUs from "./pages/aboutus";
import News from "./pages/news";
import Team from "./pages/team";
import Conctact from "./pages/contacts";
import Footer from "./components/footer";
import StayConnected from "./components/stay_connected";
import AboutSection from "./about/about_section";
import PracticeArea from "./practice/practice_area"
import ContactPage from "./contact/contact_page"
import NewPage from "./news/news_page"
import ExtendedNews from "./news/expanded_news"
import ExtendedNews2 from "./news/expanded_news2"
import ExtendedNews3 from "./news/expanded_news3"
import Attorneys from "./attorneys/attorneys";
import ClaimForm from "./vga-form/ClaimForm"; 
import FileClaimPage from "./fileclaim_page/file_claim_page";
import FormProcessingPage from "./blankpage/FormProcessingPage";
import SocialMediaClaimForm1 from "./social-media-form-qr/SocialMediaClaimForm1";
import SocialMediaClaimForm2 from "./social-media-form-qr/SocialMediaClaimForm2";
import SocialMediaClaimForm3 from "./social-media-form-qr/SocialMediaClaimForm3";
import SocialMediaClaimForm4 from "./social-media-form-qr/SocialMediaClaimForm4";
import SocialMediaClaimForm5 from "./social-media-form-qr/SocialMediaClaimForm5";
import SocialMediaClaimForm6 from "./social-media-form-qr/SocialMediaClaimForm6";
import SocialMediaClaimForm7 from "./social-media-form-qr/SocialMediaClaimForm7";
import SocialMediaClaimForm8 from "./social-media-form-qr/SocialMediaClaimForm8";
import SocialMediaClaimForm9 from "./social-media-form-qr/SocialMediaClaimForm9";
import SocialMediaClaimForm10 from "./social-media-form-qr/SocialMediaClaimForm10";
import SocialMediaClaimForm11 from "./social-media-form-qr/SocialMediaClaimForm11";
import SocialMediaClaimForm12 from "./social-media-form-qr/SocialMediaClaimForm12";
import SocialMediaClaimForm13 from "./social-media-form-qr/SocialMediaClaimForm13";
import SocialMediaClaimForm14 from "./social-media-form-qr/SocialMediaClaimForm14";
import SocialMediaClaimForm15 from "./social-media-form-qr/SocialMediaClaimForm15";
import PFASQR1 from "./pfasform-qr/pfasform1";
import PFASQR2 from "./pfasform-qr/pfasform2";
import PFASQR3 from "./pfasform-qr/pfasform3";
import PFASQR4 from "./pfasform-qr/pfasform4";
import PFASQR5 from "./pfasform-qr/pfasform5";
import PFASQR6 from "./pfasform-qr/pfasform6";
import PFASQR7 from "./pfasform-qr/pfasform7";
import PFASQR8 from "./pfasform-qr/pfasform8";
import PFASQR9 from "./pfasform-qr/pfasform9";
import PFASQR10 from "./pfasform-qr/pfasform10";
import PFASQR11 from "./pfasform-qr/pfasform11";
import PFASQR12 from "./pfasform-qr/pfasform12";
import PFASQR13 from "./pfasform-qr/pfasform13";
import PFASQR14 from "./pfasform-qr/pfasform14";
import PFASQR15 from "./pfasform-qr/pfasform15";
import PFASQR16 from "./pfasform-qr/pfasform16";
import PFASQR17 from "./pfasform-qr/pfasform17";
import PFASQR18 from "./pfasform-qr/pfasform18";
import PFASQR19 from "./pfasform-qr/pfasform19";
import PFASQR20 from "./pfasform-qr/pfasform20";
import CRCA from "./crc-form/crc_a"
import CRCB from "./crc-form/crc_b"
import CRCC from "./crc-form/crc_c"
import CRCD from "./crc-form/crc_d"
import CRCE from "./crc-form/crc_e"
import CRCF from "./crc-form/crc_f"
import CRCG from "./crc-form/crc_g"
import CRCH from "./crc-form/crc_h"
import CRCI from "./crc-form/crc_i"
import CRCJ from "./crc-form/crc_j"
import PFASForm from "./pfasform/pfasform"
import PFASPage from "./pfaspage/pfaspage"
import PFASClaim from "./pfasclaim/pfasclaim"
import SocialMediaClaimForm from "./social-media-form/SocialMediaClaimForm"

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Homepage />
              <Expertise />
              <AboutUs />
              <News />
              <Team />
              <Conctact />
              <StayConnected />
              <Footer />
            </>
          }
        />

        <Route
          path="/about_section"
          element={
            <>
              <AboutSection />
              <Footer />
            </>
          }
        />

        <Route
          path="/practice_area"
          element={
            <>
              <PracticeArea />
              <Footer />
            </>
          }
        />
        
        <Route
          path="/claim-form"
          element={
            <>
              <ClaimForm />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact_page"
          element={
            <>
              <ContactPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/file_claim_page"
          element={
            <>
              <FileClaimPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/news_page"
          element={
            <>
              <NewPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/extended_news"
          element={
            <>
              <ExtendedNews />
              <Footer />
            </>
          }
        />

        <Route
          path="/expanded_news2"
          element={
            <>
              <ExtendedNews2 />
              <Footer />
            </>
          }
        />

        <Route
          path="/expanded_news3"
          element={
            <>
              <ExtendedNews3 />
              <Footer />
            </>
          }
        />

        <Route
          path="/attorneys"
          element={
            <>
              <Attorneys />
              <Footer />
            </>
          }
        />

        <Route
          path="/form-processing"
          element={
            <>
              <FormProcessingPage />
              <Footer />
            </>
          }
        />

        <Route
        path="/crc001"
        element={
          <>
            <CRCA/>
            <Footer />
          </>
        }
        />

        <Route
        path="/crc002"
        element={
          <>
            <CRCB/>
            <Footer />
          </>
        }

        /><Route
        path="/crc003"
        element={
          <>
            <CRCC/>
            <Footer />
          </>
        }

        /><Route
        path="/crc004"
        element={
          <>
            <CRCD/>
            <Footer />
          </>
        }

        /><Route
        path="/crc005"
        element={
          <>
            <CRCE/>
            <Footer />
          </>
        }

        /><Route
        path="/crc006"
        element={
          <>
            <CRCF/>
            <Footer />
          </>
        }

        /><Route
        path="/crc007"
        element={
          <>
            <CRCG/>
            <Footer />
          </>
        }

        /><Route
        path="/crc008"
        element={
          <>
            <CRCH/>
            <Footer />
          </>
        }

        /><Route
        path="/crc009"
        element={
          <>
            <CRCI/>
            <Footer />
          </>
        }

        /><Route
        path="/crc010"
        element={
          <>
            <CRCJ/>
            <Footer />
          </>
        }
        />

        <Route
        path="/pfasform"
        element={
          <>
            <PFASForm/>
            <Footer />
          </>
        }
        />

        <Route
        path="/pfaspage"
        element={
          <>
            <PFASPage/>
            <Footer />
          </>
        }
        />

        <Route
        path="/pfasclaim"
        element={
          <>
            <PFASClaim />
           
          </>
        }
        />

        <Route
        path="/social-media-claim-form"
        element={
          <>
            <SocialMediaClaimForm/>
            <Footer />
          </>
        }

        />
          <Route
            path="/SocialMediaClaimForm1"
            element={
              <>
                <SocialMediaClaimForm1 />
                <Footer />
              </>
            }
          />
          <Route
            path="/SocialMediaClaimForm2"
            element={
              <>
                <SocialMediaClaimForm2 />
                <Footer />
              </>
            }
          />
          <Route
            path="/SocialMediaClaimForm3"
            element={
              <>
                <SocialMediaClaimForm3 />
                <Footer />
              </>
            }
          />
          <Route
            path="/SocialMediaClaimForm4"
            element={
              <>
                <SocialMediaClaimForm4 />
                <Footer />
              </>
            }
          />
          <Route
            path="/SocialMediaClaimForm5"
            element={
              <>
                <SocialMediaClaimForm5 />
                <Footer />
              </>
            }
          />
          <Route
            path="/SocialMediaClaimForm6"
            element={
              <>
                <SocialMediaClaimForm6 />
                <Footer />
              </>
            }
          />
          <Route
            path="/SocialMediaClaimForm7"
            element={
              <>
                <SocialMediaClaimForm7 />
                <Footer />
              </>
            }
          /><Route
            path="/SocialMediaClaimForm8"
            element={
              <>
                <SocialMediaClaimForm8 />
                <Footer />
              </>
            }
          /><Route
            path="/SocialMediaClaimForm9"
            element={
              <>
                <SocialMediaClaimForm9 />
                <Footer />
              </>
            }
          /><Route
            path="/SocialMediaClaimForm10"
            element={
              <>
                <SocialMediaClaimForm10 />
                <Footer />
              </>
            }
          /><Route
            path="/SocialMediaClaimForm11"
            element={
              <>
                <SocialMediaClaimForm11 />
                <Footer />
              </>
            }
          /><Route
            path="/SocialMediaClaimForm12"
            element={
              <>
                <SocialMediaClaimForm12 />
                <Footer />
              </>
            }
          /><Route
            path="/SocialMediaClaimForm13"
            element={
              <>
                <SocialMediaClaimForm13 />
                <Footer />
              </>
            }
          />
          <Route
            path="/SocialMediaClaimForm14"
            element={
              <>
                <SocialMediaClaimForm14 />
                <Footer />
              </>
            }
          /><Route
            path="/SocialMediaClaimForm15"
            element={
              <>
                <SocialMediaClaimForm15 />
                <Footer />
              </>
            }
          />
          <Route
            path="/pfasform1"
            element={
              <>
                <PFASQR1 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform2"
            element={
              <>
                <PFASQR2 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform3"
            element={
              <>
                <PFASQR3 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform4"
            element={
              <>
                <PFASQR4 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform5"
            element={
              <>
                <PFASQR5 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform6"
            element={
              <>
                <PFASQR6 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform7"
            element={
              <>
                <PFASQR7 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform8"
            element={
              <>
                <PFASQR8 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform9"
            element={
              <>
                <PFASQR9 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform10"
            element={
              <>
                <PFASQR10 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform11"
            element={
              <>
                <PFASQR11 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform12"
            element={
              <>
                <PFASQR12 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform13"
            element={
              <>
                <PFASQR13 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform14"
            element={
              <>
                <PFASQR14 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform15"
            element={
              <>
                <PFASQR15 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform16"
            element={
              <>
                <PFASQR16 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform17"
            element={
              <>
                <PFASQR17 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform18"
            element={
              <>
                <PFASQR18 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform19"
            element={
              <>
                <PFASQR19 />
                <Footer />
              </>
            }
          />

          <Route
            path="/pfasform20"
            element={
              <>
                <PFASQR20 />
                <Footer />
              </>
            }
          />
      </Routes>

      

    </>
  );
}

export default App;
