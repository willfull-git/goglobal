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

    // |--- drag
    this.dragStartX = null;
    this.dragStartY = null;
  }


  // | Zoom In
  // |----------
  zoomIn(e){
    // |--- check
    if(!(this.zoomLevel<5)){
      this.x = -this.mapTransLeft;
      this.y = -this.mapTransTop;

      return;
    }

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


  // | Drag - Start
  // |----------
  dragStart(e){
    console.log('--| [drag start]');

    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
  }


  // | Drag
  // |----------
  drag(e){
    this.x = -this.mapTransLeft - (this.dragStartX - e.clientX);
    this.y = -this.mapTransTop  - (this.dragStartY - e.clientY);

    if( this.x>=0 ){
      this.x = 0;
    } else if( Math.abs(this.x)>=this.refSvgContainer.offsetWidth-this.refMap.offsetWidth ){
      this.x = -(this.refSvgContainer.offsetWidth-this.refMap.offsetWidth);
    }

    if( this.y>=0 ){
      this.y = 0;
    } else if( Math.abs(this.y)>=this.refSvgContainer.offsetHeight-this.refMap.offsetHeight ){
      this.y = -(this.refSvgContainer.offsetHeight-this.refMap.offsetHeight);
    }

    this.refSvgContainer.style.transform = 'translate('+ this.x +'px, '+ this.y +'px)';
  }


  // | Drag - End
  // |----------
  dragEnd(e){
    console.log('--| [drag end]');
  }
}
