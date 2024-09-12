import React, { useState,useRef,useEffect } from 'react'
import './Compliance.css';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Link} from 'react-router-dom';


function Compliance() {
    const arr=["Aceclofenac + Paracetamol + Rabeprazole",
"Nimesulide + Diclofenac",
"Nimesulide + Cetirizine + Caffeine",
"Nimesulide + Tizanidine",
"Paracetamol + Cetirizine + Caffeine",
"Diclofenac + Tramadol + Chlorzoxazone",
"Dicyclomine + Paracetamol + Domperidone",
"Nimesulide + Paracetamol",
"Paracetamol + Phenylephrine + Caffeine",
"Diclofenac + Tramadol + Paracetamol",
"Diclofenac + Paracetamol + Chlorzoxazone + Famotidine",
"Naproxen + Paracetamol",
"Nimesulide + Serratiopeptidase",
"Paracetamol + Diclofenac + Famotidine",
"Nimesulide + Pifofenone + Fenpiverinium + Benzyl Alcohol",
"Omeprazole + Paracetamol + Diclofenac",
"Nimesulide + Paracetamol injection",
"Tamsulosin + Diclofenac",
"Paracetamol + Phenylephrine + Chlorpheniramine + Dextromethorphan + Caffeine",
"Diclofenac + Zinc Carnosine",
"Diclofenac + Paracetamol + Chlorpheniramine Maleate + Magnesium Trisillicate",
"Paracetamol + Pseudoephedrine + Cetrizine",
"Phenylbutazone + Sodium Salicylate",
"Lornoxicam + Paracetamol + Trypsin",
"Paracetamol + Mefenamic Acid + Ranitidine + Dicylomine",
"Nimesulide + Dicyclomine",
"Heparin + Diclofenac",
"Glucosamine + Methyl Sulfonyl Methane + Vitamin D3 + Manganese + Boron + Copper + Zinc",
"Paracetamol + Tapentadol",
"Tranexamic Acid + Proanthocyanidin",
"Benzoxonium Chloride + Lidocaine",
"Lornoxicam + Paracetamol + Tramadol",
"Lornoxicam + Paracetamol + Serratiopeptidase",
"Diclofenac + Paracetamol + Magnesium Trisilicate",
"Paracetamol + Domperidone + Caffeine",
"Ammonium Chloride + Sodium Citrate + Chlorpheniramine Maleate + Menthol",
"Paracetamol + Prochlorperazine",
"Serratiopeptidase (enteric coated 20000 units) + Diclofenac Potassium & 2 tablets of Doxycycline",
"Nimesulide + Paracetamol Suspension",
"Aceclofenac + Paracetamol + Famotidine",
"Aceclofenac + Zinc Carnosine",
"Paracetamol + Disodium Hydrogen Citrate + Caffeine",
"Paracetamol + DL Methionine",
"Disodium Hydrogen Citrate + Paracetamol",
"Paracetamol + Caffeine + Codeine",
"Aceclofenac (SR) + Paracetamol",
"Diclofenac + Paracetamol injection",
"Azithromycin + Cefixime",
"Amoxicillin + Dicloxacillin",
"Amoxicillin 250 mg + Potassium Clavulanate Diluted 62.5 mg",
"Azithromycin + Levofloxacin",
"Cefixime + Linezolid",
"Amoxicillin + Cefixime + Potassium Clavulanic Acid",
"Ofloxacin + Nitazoxanide",
"Cefpodoxime Proxetil + Levofloxacin",
"Azithromycin, Secnidazole and Fluconazole kit",
"Levofloxacin + Ornidazole + Alpha Tocopherol Acetate",
"Nimorazole + Ofloxacin",
"Azithromycin + Ofloxacin",
"Amoxycillin + Tinidazole",
"Doxycycline + Serratiopeptidase",
"Cefixime + Levofloxacin",
"Ofloxacin + Metronidazole + Zinc Acetate",
"Diphenoxylate + Atropine + Furazolidone",
"Fluconazole Tablet, Azithromycin Tablet and Ornidazole Tablets",
"Ciprofloxacin + Phenazopyridine",
"Amoxycillin + Dicloxacillin + Serratiopeptidase",
"Azithromycin + Cefpodoxime",
"Lignocaine + Clotrimazole + Ofloxacin + Beclomethasone",
"Cefuroxime + Linezolid",
"Ofloxacin + Ornidazole + Zinc Bisglycinate",
"Metronidazole + Norfloxacin",
"Amoxicillin + Bromhexine",
"Ciprofloxacin + Fluticasone + Clotrimazole + Neomycin",
"Metronidazole + Tetracycline",
"Cephalexin + Neomycin + Prednisolone",
"Azithromycin + Ambroxol",
"Cilnidipine + Metoprolol Succinate + Metoprolol Tartrate",
"L-Arginine + Sildenafil",
"Atorvastatin + Vitamin D3 + Folic Acid + Vitamin B12 + Pyridoxine",
"Metformin + Atorvastatin",
"Clindamycin + Telmisartan",
"Olmesartan + Hydrochlorothiazide + Chlorthalidone",
"L-5-Methyltetrahydrofolate Calcium + Escitalopram",
"Pholcodine + Promethazine",
"Paracetamol + Promethazine",
"Betahistine + Ginkgo Biloba Extract + Vinpocetine + Piracetam",
"Cetirizine + Diethyl Carbamazine",
"Doxylamine + Pyridoxine + Mefenamic Acid + Paracetamol",
"Drotaverine + Clidinium + Chlordiazepoxide",
"Imipramine + Diazepam",
"Flupentixol + Escitalopram",
"Paracetamol + Prochlorperazine",
"Gabapentin + Mecobalamin + Pyridoxine + Thiamine",
"Imipramine + Chlordiazepoxide + Trifluoperazine + Trihexyphenidyl",
"Chlorpromazine + Trihexyphenidyl",
"Ursodeoxycholic Acid + Silymarin",
"Metformin 1000/1000/500/500mg + Pioglitazone 7.5/7.5/7.5/7.5mg + Glimepiride",
"Gliclazide 80 mg + Metformin 325 mg",
"Voglibose + Metformin + Chromium Picolinate",
"Pioglitazone 7.5/7.5mg + Metformin 500/1000mg",
"Glimepiride 1mg/2mg/3mg + Pioglitazone 15mg/15mg/15mg + Metformin 1000mg/1000mg/1000mg",
"Glimepiride 1mg/2mg + Pioglitazone 15mg/15mg + Metformin 850mg/850mg",
"Metformin 850mg + Pioglitazone 7.5 mg + Glimepiride 2mg",
"Metformin 850mg + Pioglitazone 7.5 mg + Glimepiride 1mg",
"Metformin 500mg/500mg + Gliclazide SR 30mg/60mg + Pioglitazone 7.5mg/7.5mg",
"Voglibose + Pioglitazone + Metformin",
"Metformin + Bromocriptine",
"Metformin + Glimepiride + Methylcobalamin",
"Pioglitazone 30 mg + Metformin 500 mg",
"Glimepiride + Pioglitazone + Metformin",
"Glipizide 2.5mg + Metformin 400 mg",
"Pioglitazone 15mg + Metformin 850 mg",
"Metformin ER + Gliclazide MR + Voglibose",
"Chromium Polynicotinate + Metformin",
"Metformin + Gliclazide + Pioglitazone + Chromium Polynicotinate",
"Metformin + Gliclazide + Chromium Polynicotinate",
"Glibenclamide + Metformin (SR) + Pioglitazone",
"Metformin (Sustained Release) 500mg + Pioglitazone 15 mg + Glimepiride 3mg",
"Metformin (SR) 500mg + Pioglitazone 5mg",
"Chloramphenicol + Beclomethasone + Clotrimazole + Lignocaine",
"Clotrimazole + Ofloxaxin + Lignocaine + Glycerine and Propylene Glycol",
"Chloramphenicol + Lignocaine + Betamethasone + Clotrimazole + Ofloxacin + Antip"
]
 
 
 const [medicineName,setMedicineName]=useState('');
 const [alert,setalert]=useState('');
 const [scanResult, setScanResult] = useState(null);
 const [manualSerialNumber, setManualSerialNumber] = useState('');

 useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(success, error);

    function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false;
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);


 

 const handleChange=(event)=>{
    setMedicineName(event.target.value);
 }

 function handleManualSerialNumberChange(event) {
    setManualSerialNumber(event.target.value);
  }



 const handleSubmit=(event)=>{
    event.preventDefault(); 
    console.log('Submitting:', medicineName);
      if(arr.includes(medicineName)){
        setalert("The medicines are banned in india and does not fulfill the compliance");
      }
      else{
        setalert("This medicine fulfill the criteria of compliance");
      }
    }
     
    
  
 
      return (
   
        <div className="full-page-container">
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow ">
            <h1>Compliance Page</h1>
            <div className="form-group">
                <label htmlFor="medicineName" className="form-label">Medicine Name</label>
                <input
                    type="text"
                    id="medicineName"
                    className="form-control"
                    value={medicineName}
                    onChange={handleChange}
                    placeholder="Enter the name of the medicine"
                />
            </div>

            
                  


            <button type="submit" className="btn btn-primary">Submit</button>
            {alert && <div className="alert alert-info mt-3">{alert}</div>}
        </form>
        <div className="App">
      <h1>QR Scanning Code</h1>
      {scanResult ? (
        <div>
          <p>Success: <a href={scanResult}>{scanResult}</a></p>
          <p>Serial Number: {scanResult.slice(-16)}</p>
        </div>
      ) : (
        <div>
          <div id="reader"></div>
          <p className="center-text">Or enter the serial number manually:</p>
          <div className="center-input">
            <input
              type="text"
              value={manualSerialNumber}
              onChange={handleManualSerialNumberChange}
            />
            {manualSerialNumber && (
              <p>Serial Number: {manualSerialNumber.slice(-16)}</p>
            )}
          </div>
        </div>
      )}
    </div>

    <button className="hidden" id="register" >
                <Link className=' text-red-500 font-bold' to={'/feedback'}>Submit</Link>
                </button>

            
    </div>
    
  )
}

export default Compliance
