import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './practice_area.css';
import { House, ChevronsRight } from "lucide-react";
import Sample1 from '../assets/sample1.webp';
import Sample2 from '../assets/sample2.webp';
import Sample3 from '../assets/sample3.webp';
import Sample4 from '../assets/sample4.webp';

const PracticeArea = () => {
  useEffect(() => {
    const scrollWithOffset = (el) => {
      const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
      const yOffset = -16; 
      window.scrollTo({
        top: yCoordinate + yOffset,
        behavior: 'smooth'
      });
    };

    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => scrollWithOffset(target), 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    document.title = "Practice Area – David Grossman & Associates";
    
    return () => {
      document.title = "David Grossman & Associates";
    };
    
  }, 
  []);


  return (            
    <div>
      <div className="orange">
        <h2>Practice Areas</h2>
        <div className="back_link">
          <Link to="/" className="back-home">
            <House strokeWidth={1} size={20} /> Home
          </Link>
          <ChevronsRight className="back-home" size={20} />
          Practice Areas
        </div>
      </div>

      <div className='practice_div'>
        <div className='sample_div' id='sample1'>
          <img src={Sample1} alt="" />
          <div>
            <h2>Antitrust: Insulin Price-Fixing</h2>
            <p>
              Diabetes continues to be one of the leading causes of death in the United States.
              Insulin is a medication used by millions of Americans to regulate their blood sugar
              levels and manage this disease. Since 2003, it is likely that you have purchased
              insulin and other diabetic medication from the insulin manufacturers through pharmacy
              benefit managers (“PBMs”), paying exorbitantly high prices due to the insulin pricing
              scheme. It is well known that the price range for insulin today can range from $300 to
              $700, despite costing manufacturers as little as $2 to produce. Our firm represents
              self-funded entities and Third-Party Administrators to recover amounts overcharged for
              Insulin and Generic Drugs by pharmaceutical companies. Our team works on a contingency
              basis so there is no outlay in financial risk for the clients. We hold seats on the
              executive committees in these litigations and are working with prestigious labor
              consultants. This is a winning formula designed to maximize recovery for our clients,
              as quickly as possible, while bothering them as little as possible.
            </p>
          </div>
        </div>

        {/* <div className='sample_div' id='sample2'>
          <div>
            <h2>Antitrust: Generic Drug Price Fixing</h2>
            <p>
              Generic drugs were originally created to make healthcare affordable for Americans, as manufacturers 
              would use the identical active pharmaceutical ingredient molecule as brand drugs at lower costs. After 
              Congress enacted the Hatch Waxman Act in 1984, Americans enjoyed decades of low-priced generic drugs 
              under a modern system of regulation, which facilitated and encouraged competition between drug manufacturers. 
              Generic Drug Price fixing involves the years 2010 to the present with 40+ Pharmaceutical Company Defendants. 
              Insulin Price fixing involves the years 2003 to the present with the defendants – Eli Lilly, Novo Nordisk, 
              Sanofi, Express Scripts, CVS Caremark and OptumRx. Despite Congress’s attempt to regulate the industry, 
              generic drug companies eventually resorted to anticompetitive and collusive conduct to line their pockets. 
              Our team has been together over 20 years and proudly offers to represent healthcare plans at no risk or up 
              front cost to the plan. If for any unlikely reason there is no recovery the plan pays nothing to G&K. The 
              drug manufacturers already plead guilty. The courts will soon decide on a final date for healthcare plans 
              to file cases.
            </p>
          </div>
          <img src={Sample2} alt="" />
        </div> */}

        <div className='sample_div' id='sample3'>
          
          <div>
            <h2>Environmental case: PFAS</h2>
            <p>
              There is a serious situation our nation faces with its water supply, contamination with Perfluoroalkyl and 
              Polyfluoroalkyl Substances (PFAS). It is terrifying how little is known about an environmental disaster we 
              face in all 50 states. We are taking action in making claim for PFAS remediation, because almost 70 percent 
              of the country has been contaminated with PFAS, including creation of many new superfund sites. We will pursue 
              litigation for remediation funds from the parties responsible for damages in sufficient amount to permanently 
              clean the contamination at each site. We will also help with obtaining funds from all available sources, 
              including PFASWaterSettlement.com, where we can assist in maximizing and protecting all claims. The scope of 
              the potential harm is complex, and we are offering professional representation to protect municipalities and 
              Americans by holding the wrongdoers responsible and obtain compelling payment for necessary remediation. So far, 
              we have seen more than $30 billion in settlement funds allocated from four defendants in the ongoing multi-district 
              litigation over the contamination of drinking water with toxic per- and polyfluoroalkyl substances (“PFAS”) 
              resulting from the widespread use of aqueous film-forming foam (“AFFF”). This historic class action settlement 
              agreement resolves the claims of Public Water Systems across the country that have been impacted by actual or 
              threatened contamination of their water systems with PFAS.
            </p>
          </div>

          <img src={Sample4} alt="" />
        </div>

        <div className='sample_div' id='sample4'>
          <img src={Sample3} alt="" />
          <div>
            <h2>Social Media Harm</h2>
            <p>
              All of the major social media companies rely on addictive algorithms and promote harmful content to increase 
              engagement and keep users online as long as possible. The following companies are named in the social media 
              addiction lawsuits: Meta Platforms: Meta is the owner of Facebook, Instagram, and WhatsApp. Through addictive 
              algorithms and the promotion of harmful content, Facebook and Instagram lure young users into staying on their 
              platforms for unhealthy lengths of time and continually checking their social media throughout the day. This is 
              an opportunity for School Districts, innovative individuals and their families to act against certain social media 
              bad actors. School districts throughout the nation have joined the litigation due to the increased resources they 
              are having to invest in mental health professionals and other costs because of the harmful effects of social media. 
              Our team of professionals and our partner support our communities and hold accountable to those who engage in civil 
              wrongs. Plaintiffs allege that the social media companies owed a heightened duty of care because the complaints 
              involve minors. According to the complaint, the social media companies knew or should have known that their products 
              could cause harm, yet they failed to mitigate the risk of harm or warn users about the risk. Social media companies 
              should be held accountable based on strict liability and negligence for the following:
              <br />
               ✔️ Algorithms that promote compulsive use with never-ending feeds.
              <br />
              ✔️ Lack of warnings when users are signing up or method to monitor and self-restrict length and frequency of use
              <br />
              ✔️ Barriers to voluntarily deleting or deactivating accounts
              <br />
              ✔️ Lack of meaningful age verification processes or effective parental controls or monitoring mechanisms
              <br />
              ✔️ Lack of labels on filtered images and videos and Intrusive notification timing designed to lure users back to the platforms
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PracticeArea;
