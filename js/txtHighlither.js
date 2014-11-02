/************************************************************************************
***                     MANDATORY USER SETTINGS                                   ***
************************************************************************************/

    /**
    * Identify the ID selector of the targeted content here: (default is 'target') :
    */
    var targetID = "target";
    


/************************************************************************************
***                     OPTIONAL USER SETTINGS                                    ***
************************************************************************************/

    /**
    * Identify the ID selector of the search field here: (default is 'input-field-default') :
    */
    var inputID = "search-field";



/************************************************************************************
***                     MAIN SCRIPT                                               ***
************************************************************************************/


    /**
    * global variables used only on page load. (REF FUNCTIONS)
    */
    var targetInitialHTML; // Used with checkSearchContent(); + mainHighlight();
    var targetContentCheck = 0; // Used with checkSearchContent();
    
 


    /**
    * This function strip HTML tag of innerHTML content strings and replace each characters by a space character maintaining charaters position index.
    */
    function stripTags( string ) {
        
        /**
        * HTML elem tag RegEx
        */
        "use strict"; //corrected byJSLint, not sure what this means still...
        var re = /<[^>]+>/ig;
        
        
        /**
        * Iterate through each match and store them in an array. The corresponding length of space char are stored in another array.
        */        
        var match = [], mask = [], space = " ", exe, spacer;
        while ( (exe = re.exec(string)) !== null ){
            spacer = [];
            match.push(exe);
            while (spacer.length !== exe[0].length) { spacer.push(space); }
            mask.push(spacer.join(""));
        }

        /**
        * Switch the matches with the space characters
        */
        for (var i = 0; i < match.length; i++) {
            string = string.replace(match[i], mask[i]);
        }

        /**
        * Return the initial string without any HTML tag.
        */
        return string;

    }


    /**
    * Declaration of a global variable block that is used with highlinghtProcess();:
    * ** The overall function could be improve by separating the term checks before this one runs.
    *   - Set up Class name of the highlighted items
    *   - RegEx used to scan the targetID content
    *   - RegEx used to deal with char spaces in the search term
    *   - Define the opening and ending markup tags of the highlighted items
    *     ** Could improve markup by injecting CSS instead of hard define it inline.
    */
    var highlightClass = "highlightjs",
        highlightRe = new RegExp(highlightClass,"ig"),
        spaceRe = /\s+/,
        spaceRe2 = /\s+$/,
        before = "<span style=\"display: inline-block; position: relative;\"><span class=\"" + highlightClass + "\" style=\"display: block; background: yellow; box-shadow: 0px 0px 1px rgb(120,120,120);\">", 
        after = "</span></span>",
        contentError = "The ID selector '" + targetID + "' does not exist in the DOM. Please define a valid ID selector in the user settings of the script and reload the page.";
    
    
    /**
    * Function find and highlight text from an HTML search inut box.
    */
    function highlightProcess( tag , content , term ) {

            
            /**
            * Declare CSS class name of highlighing HTML tags here:
            * Check for existing highlightjs tags and remove them.
            * Set RegEx to fliter search term.
            */
            var block = document.getElementById( tag );

            if (highlightRe.test( block.innerHTML )) {
                
                block.innerHTML = content;
                
            }
            
            /**
            * If: the search term contains no character, stop the function.
            */
            if ( term.length < 2 ) { 
                
                return;
            
            /**
            * Else: It run the highlightProcess
            */
            } else {
               
                /**
                * Convert the search term to global, case insensitive RegEx.
                */
                var re = new RegExp(term,"ig");
               
                /**
                * Declare arrays for the start and end positions of the term in the targeted  HTML ID tag.
                */
                var start = [];
                var end =[];
                var match;

                /**
                * Uses the helper function "stripTags()". Look for a match in the 'stripped' HTML content
                * and pushes the start and end index of each match to arrays. 
                */ 
                while ((match = re.exec(stripTags(content))) !== null) {
                    start.push(match.index);
                    end.push(match.index + term.length);
                }
                
                /**
                * Check if there was a match.
                */
                if (start.length!==0) {
                    
                    /**
                    * Reverse the order of the position value(s) in arrays. The highlight HTML tags to be inserted from the end position.
                    */
                    start = start.reverse();
                    end = end.reverse();
                    
                    /**
                    * Split every characters of the 'content' into an array. 
                    */
                    var wordArray = content.split("");
                    
                    /**
                    * Inject HTML tags for every matched item starting from the end position. (reverse to avoid errors with positions as we insert tags)
                    */
                    for (var k = 0; k < start.length; k++) {
                        wordArray.splice(end[k], 0, after);
                        wordArray.splice(start[k], 0, before);
                    }
                    
                    /**
                    * Join the splited array back together and replace the 'content'
                    */
                    block.innerHTML = wordArray.join("");
                    
                    /**
                    * Insert tabindex attributes to highlighted tags.
                    */
                    var tabIdx = document.getElementsByClassName( highlightClass );
                    for (var i = 0; i < tabIdx.length; i++) {
                        tabIdx[i].setAttribute('tabindex', i+2);
                    }

                }

            } // if else END

    } // function highl END
    

    /**
    * 
    */
    function checkTerm( term ) {
            
            var pro = term;
            /**
            * If: the search term contains no character, return an empty string.
            */
            if ( pro.length < 2 ) { 
                return "";
                
            /**
            * Else if: the search term begin with one or more space characters,
            * remove them, then check if term finish with a space char.
            */
            } else if (spaceRe.test(pro) && spaceRe.exec(pro).index === 0) {
                pro = pro.replace( spaceRe.exec(pro), "" );
                
                /**
                * If: the search term finish with one or more space characters, remove them and return.
                */
                if (spaceRe2.test(pro)) {
                  return pro.substring( 0 , pro.lastIndexOf( spaceRe2.exec(pro)) );
                
                /**
                * Else, return the first 'pro' variable of this section.
                */                
                } else {
                  return pro;
                }
              
            /**
            * Else if: the search term finish with one or more space characters, remove them and return.
            */
            } else if (spaceRe2.test(pro)) {
                
                return pro.substring( 0 , pro.lastIndexOf( spaceRe2.exec(pro)) );

            } else {
            
                return term;
            
            }
             
    }


    /**
    * This function is triggered for every characters that the user write in the search input field.
    */
    function mainHighlight(string) {

        /**
        * Check if content was identified. If no error, it continue
        */
        "use strict"; //corrected byJSLint, not sure what this means still...
        if (targetContentCheck !== 1) {
        
            highlightProcess( targetID , targetInitialHTML , checkTerm( string ) );
        
        } else {
        
            console.log(contentError);
        
        }
        
    }


/************************************************************************************
***                     ENVIRONMENT CHECK/PREP                                    ***
************************************************************************************/


    /**
    * function to check, correct and/or set up the search field attributes.
    */
    function checkInputAttributes( tag , status ) {

        /**
        * Attributes names and values in arrays
        */
        var attName = [ 'id' , 'class' , 'type' , 'name' , 'placeholder' , 'tabindex' , 'onkeyup' ];
        var attValue = [ 'input-field-default' , 'input-field-default' , 'text' , 'search' , 'Default Search Field' , '1' , 'mainHighlight(this.value)' ];

        /**
        * If search field created by this script, it injects the below default 
        * styles in the existing arrays of attributes declared previously.
        */
        if ( status === 'new' ) {
          document.body.style.padding = '40px 0 0 0';
        }


        /**
        * Iterate through each attribute names and values
        * and validate if they are setup.
        */
        for (var i = 0; i < attName.length; i++) {
            
            /**
            * If input field does't have any of the aatributes listed above, it assign them.
            */
            if ( !tag.hasAttribute( attName[i] , attValue[i] ) ) {

                tag.setAttribute( attName[i] , attValue[i] ); 
            
            }

        }

    }


    /**
    * This function create a search field at the begining of the body element. 
    */
    function createSearchField(inputID) {

        /**
        * Inject default search field styles in html head a last element.
        * TODO: improve comment and architecture.
        */
        var dftStyle = ".default-wrap{box-sizing:border-box;display:block;position:absolute;width:100%;height:40px;top:0;left:0;box-shadow: 0px 0px 10px rgb(150,150,150);}.input-field-default{box-sizing:border-box;display:block;position:absolute;width:100%;height:40px;top:0;left:0;z-index:1500;padding: 0 20px;border-radius:0px;outline:0;border:none;}";

        var fallbackStyle = document.getElementsByTagName('head')[0].lastChild;
        if (fallbackStyle.innerText !== dftStyle) {

            var insTagStyle = document.createElement("style");
            document.getElementsByTagName('head')[0].appendChild(insTagStyle);
            document.getElementsByTagName('head')[0].lastChild.innerHTML = dftStyle;

        }
        
        /**
        * Create new, plain elements
        */
        var insTagDiv = document.createElement("div");
        var insTagInput = document.createElement("input");

        /**
        * Get a reference to the element, before we want to insert the element
        */
        var insRef = document.body.firstChild;

        /**
        * Get a reference to the parent element
        */
        var parentDiv = insRef.parentNode;

        /**
        * Insert the new Div element before insRef
        */
        parentDiv.insertBefore(insTagDiv, insRef);
        var div = document.body.firstChild;
        div.setAttribute("id", "default-wrap");
        div.setAttribute("class", "default-wrap");

        /**
        * Insert the new Div element before insRef
        */
        div.appendChild(insTagInput);
        var input = div.firstChild;

        /**
        * Inject attributes in the newly created input element
        */
        checkInputAttributes( input , 'new' );

    }
  
  
    /**
    * Check if ID selector exist in the DOM.
    * To be used with 'targetContentCheck' global variable.
    */
    function checkSearchContent( searchID ) {
        
        /**
        * If it exist, it store its content in a variable defined globaly as initial value
        */
        if (document.getElementById(searchID)) {
            
            targetInitialHTML = document.getElementById(searchID).innerHTML;
          
        /**
        * If it does not exist, it console log the error.
        */
        } else {
            targetContentCheck = 1;
            console.log(contentError);
            return;
        }

    }
    

    /**
    * Self executing function to validate and/or setup the environment.
    */
    function setup() {
    
        /**
        * Check if a search field with 'inputID' selector exist.
        */
        "use strict"; //corrected byJSLint, not sure what this means still...
        var input = document.getElementById( inputID );
        if ( input ) {
        
            /**
            * If yes, validate the inputID attributes and make amendments if needed.
            */
            checkInputAttributes( input );
                        
        } else {
                    
            /**
            * If not, it creates the search field with default values before
            */
            createSearchField( inputID );
            
        }

        /**
        * Validate if the 'targetID' identified exists.
        */
        checkSearchContent( targetID );
        
    } setup();