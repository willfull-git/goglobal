export default class Navigation {
  // | Properties
  // |----------
  constructor(zoomLevel, refMap, refSvgContainer){
    // |--- zoom
    this.zoomLevel = zoomLevel;
    this.zoomStep  = 0.5;
    this.zoomCef   = 1;

    // |--- references
    this.refMap          = refMap;
    this.refSvgContainer = refSvgContainer;

    // |--- position
    this.x = 0;
    this.y = 0;

    // |--- additional sizes
    if(refMap && refSvgContainer){
      this.mapCssTrans  = this.refSvgContainer.style.transform;
      this.mapTransLeft = Math.abs( parseInt( this.mapCssTrans.slice( this.mapCssTrans.indexOf('(')+1 ) ) );
      this.mapTransTop  = Math.abs( parseInt( this.mapCssTrans.slice( this.mapCssTrans.indexOf(',')+1 ) ) );
      this.mapOffLeft   = this.refMap.offsetLeft;
      this.mapOffTop    = this.refMap.offsetTop;
    }
  }


  // | Zoom In
  // |----------
  zoomIn(e){
    // |--- check
    if(!(this.zoomLevel<5)) return;

    this.zoomLevel = this.zoomLevel + this.zoomStep;
    this.zoomCef   = this.zoomLevel / (this.zoomLevel-this.zoomStep);
    this.cursorX   = e.clientX - this.mapOffLeft;
    this.cursorY   = e.clientY - this.mapOffTop;

    // |--- compute zoom center
    this.x = 
      this.cursorX
      -
      ((this.cursorX+this.mapTransLeft)
        *
        this.zoomCef);

    this.y = 
      this.cursorY
      -
      ((this.cursorY+this.mapTransTop)
        *
        this.zoomCef);
  }


  // | Zoom Out
  // |----------
  zoomOut(e){
    // |--- check
    if(!(this.zoomLevel>1)) return;

    this.zoomLevel = this.zoomLevel - this.zoomStep;
    this.zoomCef   = this.zoomLevel / (this.zoomLevel+this.zoomStep);
    this.cursorX   = e.clientX - this.mapOffLeft;
    this.cursorY   = e.clientY - this.mapOffTop;

    // |--- compute zoom center
    this.x = 
      this.cursorX
      -
      ((this.cursorX + this.mapTransLeft)
        *
        this.zoomCef);

    this.y = 
      this.cursorY
      -
      ((this.cursorY + this.mapTransTop)
        *
        this.zoomCef);


    // |--- Align if out of border
    let
      viewChunkHr, viewChunkVr;

    if( this.x>0 ){
      this.x = 0;
    } else if( this.x<0 ){
      viewChunkHr = (this.refSvgContainer.offsetWidth*this.zoomCef) - Math.abs(this.x);

      if(viewChunkHr<this.refMap.offsetWidth){
        this.x = -((this.refSvgContainer.offsetWidth*this.zoomCef) - this.refMap.offsetWidth);
      }
    }

    if( this.y>0 ){
      this.y = 0;
    } else if( this.y<0 ){
      viewChunkVr = (this.refSvgContainer.offsetHeight*this.zoomCef) - Math.abs(this.y);

      if(viewChunkVr< this.refMap.offsetHeight){
        this.y = -((this.refSvgContainer.offsetHeight*this.zoomCef) - this.refMap.offsetHeight);
      }
    }
  }
}
