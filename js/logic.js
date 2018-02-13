
  class Node
  {
      constructor(nVal, oLeft, oRight)
      {
        this.val = nVal ;
        this.left = oLeft ;
        this.right = oRight ;
      }
  }
//File input contains Pyramid of rows
//Split Rows by breaking line
//Split Row by comma
//Build Nodes Tree
//Iterate Recursively until it gets to leaf null and calculate path value
//Create Array of path values with same value counter
//Sort Array by counters
//Create list of values and counts
//Display Pyramid, Summary and list of pairs: value, count
  jQuery.get('./input.txt', function(data) {
    //Build Left/Right Tree, End Leaf = null
    let oTree = new Array() 
    let oNode = null ;
    //Split Rows by breaking line
    let oArr = data.split(/\n/g) ;
    for( let i = 0 ; i < oArr.length - 1 ; i++ )
    {
        //Split Row by comma
        let oArrLevel1 = oArr[i].split(",") ;
        let oArrLevel2 = oArr[i+1].split(",") ;

        for( let i1 = 0 ; i1 < oArrLevel2.length - 1 ; i1++ )
        {
            let nTop = oArrLevel1[i1] ;
            let nLeft = oArrLevel2[i1] ;
            let nRight = oArrLevel2[i1+1] ;
            let oNodeLeft  = oTree[i+"" +nLeft] ;
            if( typeof(oNodeLeft) == "undefined" )
            {
                oNodeLeft = new Node(nLeft, null, null) ;
            }

            let oNodeRight = new Node(nRight, null, null) ;

            let oNodeTop = null ;
            //Decide whether to create new or use prev left as top
            if( i == 0 )
            {
                oNodeTop = new Node(nTop, oNodeLeft, oNodeRight) ;
            }
            else
            {
                oNodeTop = oTree[(i-1)+"" +nTop] ;
                oNodeTop.left = oNodeLeft ;
                oNodeTop.right = oNodeRight ;
            }

            
            oTree[i+"" +nLeft] = oNodeLeft ;
            oTree[i+"" +nRight] = oNodeRight ;
            if( oArrLevel1.length == 1 && i1 == 0 )
            {
             oTree[i1+"" +oArrLevel1] = oNodeTop ;
             oNode = oNodeTop ;
            }
        }
    }
    $('#idFile').html('<p>'+data.replace(/\n/g,'<br />')+'</p>');
    let oArrCount = new Array() ;

    //Iterate Recursively until it gets to leaf null and calculate path value
    function calc(oNode, nValue, sDir)
    {     
        if( oNode == null )
        {
            $('#idCalc').append("Summary:"+nValue+'<br />');
            if( typeof(oArrCount[nValue]) == "undefined" )
            {
                //Create Array of path values with same value counter
                let obj = new Object() ;
                obj.val = nValue ;
                obj.count = 0 ;
                oArrCount[nValue] = obj ;
            }
            let obj = oArrCount[nValue] ;
            obj.count++ ;
        }
       else
       {
        calc(oNode.left, nValue+oNode.val*1, "left") ;
        if( oNode.right != null )
        {
            calc(oNode.right, nValue+oNode.val*1, "right") ; 
        }
       }      
       
       return nValue ;
    }

    calc(oNode, 0, "Root");
    //Sort Array by counters
    oArrCount.sort(
        function(a, b){
            if( a.count < b.count )
            {
                return -1 ;
            }

            if( a.count > b.count )
            {
                return 1 ;
            }

                     
            // names must be equal
            return 0;
        }
    )
    //Create list of values and counts
    let sRes = "<ul>" ;
    oArrCount.forEach(function(obj) {
       if( obj != null )
       {
        sRes += "<li>" ;
        sRes += "Sum:"+obj.val+" Count:"+obj.count;
        sRes += "</li>"
       }
      });
      sRes += "</ul>" ;
      //Display path array sorted by count
    $('#idCalc').append(sRes);
 });