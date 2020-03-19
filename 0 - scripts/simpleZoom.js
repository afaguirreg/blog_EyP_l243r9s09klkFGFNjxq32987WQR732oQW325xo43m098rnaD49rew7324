<!-- hide script from older browsers

/*******************************************************************
SimpleZoom.js

Author:         Randy Constan,  v1.0, 9/2016 (comments revised 12/2018)

Summary:        Pure javascript image zoom add on solution
Compatibility:  Not sure, but tested on IE (back to IE8, but its a little 
                slow on that), Chrome v49, Firefox v43, 
                Safari on iIOS 7 and up, and a few old as
                dirt android tablets. 


This script makes it pretty easy and painless to add ZOOM capability to your images. All you'll have to do to to modify your existing page is add an onclick="zoom(this)" to each image tag you want to be able to zoom, and add one extra HTML <div> and <img> block. Then, when you click on any image (or tap it on a mobile device), a separate tiny instance of the image will appear in the center of the screen, and rapidly expand until either the height or width screen limit is reached (whichever happens first). Any scrolling of the rest of the page at that point won't affect the zoomed image position, because its style is of the floating zoomed image is "fixed". Clicking again, either on the original image (if its still visible), or any other image (with the onclick="zoom()" addition), or the zoomed image itself will cause the zoomed copy to rapidly shrink and disappear. As for mobile devices, the behavior of a zoomed image is reasonable when screen orientation changes, but in that case the zoomed picture may be larger or smaller then the original screen size limit. But following the rotation, subsequent zooms will again scale to the first screen limit reached, as expected. This is worked well on the the mobile screens I've tested with, but if it is found to cause problems, there are some commented out lines to force a simple reset of any zoomed image when the orientation changes. if you find some hidden "gotchas" when the screen is turned like that, I'd appreciate knowing! 

As is, this add on does not mandate thumbnails, and is very handy when you're trying to make old pages more responsive. In my case for example, I'll usually pre size my images a lot smaller then the camera created, maybe just 1024 x 768, so its bandwidth isn't bad, but but thats still larger then I intend to displaay it. So then on my page, I'll set my <img> tags to auto scale one dimension (probably height) and set the width to a certain percent of the screen. So for example I may have an image likethe following. Note the addition of my zoom() call.

<img src="myImg.JPG" width="25%" align="left" hspace="10"  onclick="zoom(this);" >

Now regarding the image itself, First of all, note that only the width is specified in the <img> tag attribute. While its best to specify both width and height, the browser is going to have to figure it out the height anyway if you specify the width by %, and 
while the 'auto' tag wouls seem the best thing for the height attribute, it would be pretty much ignored by the browser and worse, if you want to support back to IE-8 (thye last MMS windows browser availble to Windows XP), the 'auto' tag will be taken as a 'zero' (0), and your picture will all look squshed horizontally! So if you are going to go with tag attributes, just specify width, and do it as a percent (%) to be responsive! 

Second, yeah I know, I should use CSS and "float" to position the image left in the above example. That will work too. I'm just illustrating how easily you can add this zoom feature to even an old-school page design. In any case, my images were all previously resized to something that would more than fill a typical browser window screen, so my 25% scaling makes them fit the page as I want. That used to be a problem for bandwidth, but its not so much these days. And in that situation, it is nice to have an easy way to allow the visitor to just see the image at least full screen size. 

Now you don't have to do it this way though! If you wanted to use true thumbnails, no big deal, though you'll need to make SOME minor changes. In that case you would need to have a small and large copy with similar enough filenames that you could easilly modify the filename with a little javascript. In the main zoom() function, I've provided one possible way to do this, in some comented out lines. Here, the first thing that is done is the full file source path is obtained from the passed image object, so that a new instance of the picture can be loaded, like this...

zoom(itm)
{
  zoomIm = document.getElementById('pic'); // this is my secondary temp img
  zoomIm.style.visibility = 'hidden';    // hide until scaled
 
  // example method of altering filename to obtain large version
  // var tmpStr = itm.src;
  // zoomIm.src = tmpStr.replace(/.JPG/i, "LARGE.JPG");
  // alert (zoomIm.src); // debug
  
  zoomIm.src = itm.src; // get new copy of selected img into 'im'

zoomIm is a global variable that serves as an independent image object. So if your original pictures were the small ones, and all your large versions were simply the same file path/name with maybe the word LARGE added, all you would have to do is substitute the middle two comented out lines for the last line shown above. Once done, instead of a direct copy of the existing source file string, I'm searching for the ".JPG" and substituting a variation ( in this case "LARGE.JPG"). Javascript provides many ways to manipulate strings like this, and with a little though much better and more general use method could be employed. I'm not going into how to do string manipulation here, but its not a big deal. Google it! :-)

For now we'll just proceed assuming we're just working with one file for each image, without modifying the existing code. 

So for implementation, you'll also want to either add the whole sript to the <head> section of your page, or better yet load in the whole JS file, like this...

<script language="JavaScript"  src="./scripts/simpleZoom.js"> </script>

Next, add this to your <body>  tag.

onload="setZoomInit()" onresize="setZoomInit()"
 
This ensures that anytime the page is loaded or resized, calculations are done to figure out the current screen limits, and also re-size and re-center any image already zoomed. The other addition you need to make, early in the body of the page is this...

<!-- this div initially sized and positioned by style -->

<div id="ShowPic" style="z-index:2;"><img id = "pic"   height="100" border="0" onclick="zoom(null);" >
 </div>

So this is just a div with some image object already in it. You may not need the 'z-index' style added, but it won't hurt. Its there in case you're adding this to a page that already has other screen objects with a postion other then the default (static) which may have some display priorities. In fact you may have to adjust that z-index number highr in that case. Also notice there is no actual image source in the tag, and the onclick call to zoom() is just passing a 'null'. This is just a way of creating an incomplete <img> object, saving some coding steps. I arbitrarily sized it to 100 in height, and that number probably doesn't matter at all. As explained before, and despite previous versions of these comments, I discovered its best to leave out 'auto' for the width! IE8 doesn't like it, and the browser really doesn't need it.  You can set just one dimension (in theis case the height) and the image's aspect ratio (once loaded into the <img>  will be preserved by the browser. If you ever find an old browser that complains about the lack of any actual image "src", you would could add a "src" attribute, and link in a small transparent GIF. In any case, you'll never see it, transparent or not.
 
Note that there are also some variables that can be tweaked to alter some zoom behaviors. They are pretty self explanatory

var zoomSpeed = 10;        	// milliseconds between zoom increments
var zoomStep = 0.04;     	// amt + or - to zoom scale on each pass
var zoomMinScale = 0.2; 	// minimum size of zoom image
var zoomScreenMax = 0.98; 	// max part of screen taken up by full zoom

Beyond adding the onclick="zoom(this)" to each of the images you want to utilize this feature, thats all you have to do. Below are the various components of the javascript itself. If you have a question or wish to offer any improvements, please contact me using the contact form on my website...

http://elfintechnologies.com
*/

 // some flags and vars used to permit easy sharing between functions
 
var maxW;
var maxH;
var lastW;
var lastH;
var scaleFact =1;
var zoomIn = 1;   	// zoom() states 1:zoom in, 2:zoom out, 0:center only
var zoomDiv;			  	// holds div object to contain image
var zoomIm;			   // holds image object
var imgLoaded = false; // will determine how init or re-init is done

// these variables can be tweaked to alter the behavior. One tweak that
// would be useful is to detect slow browsers running on $50 tablets,  
// tweak and zoomStep up a little higher in those cases.

var zoomSpeed = 20;		// milliseconds between zoom increments
var zoomStep = 0.04; 	// amt + or - to zoom scale on each pass
var zoomMinScale = 0.2; // minimum size of zoom image
var zoomScreenMax = 0.98; // max part of screen taken up by full zoom


////////////////////////////////////////
// This is the main function called from the onclick event of every
// image you wish tho have the zoom behavior.

function zoom(itm)
{
 if (zoomIn == 1) // start over state. zoom2 will reset
 {
  zoomIm = document.getElementById('pic'); // this is my secondary temp img
  zoomIm.style.visibility = 'hidden';	// hide until scaled
 
  // example method of altering filename to obtain large version
  // var tmpStr = itm.src;
  // zoomIm.src = tmpStr.replace(/.JPG/i, "LARGE.JPG");
  // alert (zoomIm.src); // debug
  
  zoomIm.src = itm.src; // get new copy of selected img into 'im'
  imgLoaded = true;
  zoomIm.border = 2;
  zoomIm.height = maxH; // just set height. width should be auto
  scaleFact = zoomMinScale;  // start scale size
  zoomDiv.style.display ='block'; // activate the div!
  //document.getElementById('mtable').style.zindex = 3; 
  
 }
 
 
 zoom2();
}

///////////////////////////////////////
// zoom2() Does the actual work. Increses or decreases size in timed steps.
// can also be called with zoomIn state 0, to simply resize and recenter.
// it uses two state vars, 'zoomIn' controls process type, mainly
// for delayed forking of repeat calls. 
// private 'zoomStopCondition' is used to determine the end state,
// to steer logic of what should happen next. 

function zoom2()
{
	var zoomStopCondition = 0;  // 0: continue to fork / recall this process
								// 1: height or max scale limit reached
								// 2: width limit  reached
								// 3: end of shrink scale reached 
								// 4: center only, no process repeat or resize
	switch (zoomIn)
		{
		 case 1:				// increase size till max scale or max size
		 	scaleFact += zoomStep;
		 	zoomIm.style.visibility = 'visible';
		 	if (lastH >= maxH || scaleFact >= 1.0)  zoomStopCondition = 1;
		 	if (lastW >= maxW ) zoomStopCondition = 2;
		 	break;
		
		 case 2:	 			// shrink size till min scale reached
		 	scaleFact -= zoomStep;
	  	 	if (scaleFact < 0.2) zoomStopCondition = 3; //break;
		 	break;
		 
		 case 0: 
		   	zoomStopCondition = 4;
			break;  // for zero case, just scale and center
	 	} 
  
 	 switch (zoomStopCondition)
	 	{
		 case 0: 
		 	setTimeout( zoom2, zoomSpeed ); // if not stopped, continue 
		 	break;
			
		 case 2:
		 	zoomIn = 2; // setup for shrink next time
		 	return;		// max width reached. Early bailout

		 case 1: 
		  	zoomIn = 2; // setup for shrink next time
			scaleFact = 1.0; // ensure precise max height ending size
			break;
			
		 case 3:
		 	 zoomIn = 1; // process complete. setup for zoom next time
			 zoomIm.style.visibility = 'hidden';  // overkill. hide image
			 zoomDiv.style.display ='none'; // completely mask div container
			break;
		}
 
  	// re -size and center container div
  
  	lastW = maxW * scaleFact;			// calc lateswt max possible sizes
  	lastH = maxH * scaleFact;
  	zoomDiv.style.width = lastW + 'px'; // temp set div size
  	zoomDiv.style.height = lastH + 'px';
  	zoomIm.height = zoomDiv.offsetHeight;	// adjust img height to fit div
  	zoomDiv.style.width = zoomIm.width + 'px'; 	// img w is 'auto', 
												// so resize div w 
   	lastH = zoomDiv.offsetHeight;			// now save actual last sizes.
  	lastW = zoomDiv.offsetWidth;
  	centerDiv(zoomDiv);			    	// center div
}


/////////////////////////////
// added this handler to ensure proper reset in the case of mobil devices,
// where screen dimensions will change after re-orientation. It really just
// calls the existing setZoomInit(), but it has some commented out lines 
// you can activate if its found to be a problem. 

function screenOrientationChg()
{
// imgLoaded = false; 		// easy way out. Force reset.
// zoomIn = 1; 				// seems to work OK without doing this.
 // alert("screenTurned");	// debug
  setZoomInit();
}

function setZoomInit() // call from body onload() and onresize()
{
 zoomDiv = document.getElementById('ShowPic'); // div used for images
 zoomDiv.style.position = 'fixed';
    
 // get some max display boundaries. Extra hassle here because 
 // of typical old browser variations.
 var w;
 var h;
 
 if (typeof window.innerWidth != 'undefined') // newer browsers
 	{
      w = window.innerWidth;
      h = window.innerHeight;
	}
else if (typeof document.documentElement != 'undefined'
     && typeof document.documentElement.clientWidth !=
     'undefined' && document.documentElement.clientWidth != 0)
 	{
       w = document.documentElement.clientWidth,
       h = document.documentElement.clientHeight
 	} 
else
 	{
       w = document.getElementsByTagName('body')[0].clientWidth;
       h = document.getElementsByTagName('body')[0].clientHeight
 	} 
	 
 maxW = (w * zoomScreenMax);
 maxH = (h * zoomScreenMax);
 
 //zoomDiv.style.width = maxW + 'px'; // temp set to max?
 //zoomDiv.style.height = maxH+ 'px'; 
 
 if (imgLoaded) // only if last image loaded, null if never
 {
  var saveZoom = zoomIn;
  zoomDiv.style.width = lastW + 'px';  	// set/reset div size
  zoomDiv.style.height = lastH + 'px';
  zoomIn=0;					      		// scale and center only
  zoom2();
  zoomIn = saveZoom;
 }
 else 
  {
   centerDiv(zoomDiv);
   zoomDiv.style.position = 'fixed'; // so it stays put if page scrolled
   zoomDiv.style.display = 'none';  // prevent clicks from mattering now
   lastH = lastW = 0;				// reset some vars
  }

// ensure screen rotate is handled, since all display boundaries change
window.onorientationchange = screenOrientationChg;
}

//////////////////////////////////
// A centering function. This code borrowed from Mritunjay Kumar, at 
// mindfiresolutions.com. It works with any div. In this case, the 
// zoomDiv object is global, external, but remeber that objects and arrays 
// are passed by reference in javascript.


function centerDiv(zoomDiv)
{
divWidth = zoomDiv.offsetWidth;
divHeight = zoomDiv.offsetHeight;

	var centerX, centerY;
       if (self.innerHeight)
       {
           centerX = self.innerWidth;
           centerY = self.innerHeight;
       }
       else if (document.documentElement && document.documentElement.clientHeight)
       {
           centerX = document.documentElement.clientWidth;
           centerY = document.documentElement.clientHeight;
		   
       }
       else if (document.body)
       {
           centerX = document.body.clientWidth;
           centerY = document.body.clientHeight;
	   }

    var offsetLeft = (centerX - divWidth) / 2;
    var offsetTop = (centerY - divHeight) / 2;
	
    zoomDiv.style.top = offsetTop + 'px';
    zoomDiv.style.left = offsetLeft + 'px';
 }




//-->