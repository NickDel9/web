var countries = ["Afghanistan","Albania","Algeria","Andorra",
"Angola","Anguilla","Antigua &amp; Barbuda","Argentina",
"Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas",
"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize",
"Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina",
"Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria",
"Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde",
"Cayman Islands","Central Arfrican Republic","Chad","Chile","China",
"Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia",
"Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica",
"Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea",
"Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji",
"Finland","France","French Polynesia","French West Indies","Gabon",
"Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland",
"Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau",
"Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali",
"Malta","Marshall Islands",
"Mauritania","Mauritius","Mexico","Micronesia","Moldova",
"Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

//autocomplete

function autocompleteMatch(input) {
   if (input == '') {
     return [];
   }
   var reg = new RegExp(input)
   return countries.filter(function(term) {
      if (term.match(reg)) {
        return term;
      }
   });
 }
  
 function showResults(val) {
   res = document.getElementById("autoCountry");
   res.innerHTML = '';
   let list = '';
   let terms = autocompleteMatch(val);
   for (i=0; i<terms.length; i++) {
      
      list += '<li id ="listitem" name ="listitem">' + terms[i] + '</li>';
   }
   res.innerHTML = '<ul id="list">' + list + '</ul>';
   
   var items = document.querySelectorAll("#listitem");
            
   for(var i = 0; i < items.length; i++)
   {
      items[i].onclick = function(){
                    
         document.getElementById("input-country").value = this.innerHTML;

         //close list
         showResults(document.getElementById("input-country").value+' ');
      }
                
   };
   
   
   
}  

//validation

document.getElementById('submit').addEventListener('click', (e)=>{

  

  //passwords
      
   var pass = document.querySelector("#password") ;
   var pass1 = document.querySelector("#validate-password");
   
   let same = pass.value === pass1.value;
   if (!same)
   {
      document.querySelector("#validate-password").setCustomValidity("Passwords don't match")
      document.querySelector("#validate-password").reportValidity()
      return;
   }
   else{
      pass.setCustomValidity("")
      pass.reportValidity()
   }

//cards

   var ccNum = document.querySelector("#ccnum");
   
   var RegEx = /^(?:[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4})$/;
   
   var isValid = false;

   console.log(ccNum.value)

   if (RegEx.test(ccNum.value)) {
      isValid = true;
   }
  

   if (!isValid)
   {
      ccNum.setCustomValidity("invalid card number")
      ccNum.reportValidity()
      return;
   }
   else{
      ccNum.setCustomValidity("")
      ccNum.reportValidity()
   }


   //cvv

   var CVV = document.querySelector("#cvv");
   
  

   var isValid = false;

   console.log(CVV.value)

   if (CVV.value.length === 3) {
      isValid = true;
   }

   if (!isValid)
   {
      CVV.setCustomValidity("invalid CVV")
      CVV.reportValidity()
      return;
   }
   else{
      CVV.setCustomValidity("")
      CVV.reportValidity()
   }


});


