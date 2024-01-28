export class Pawn {

}
export class Knight {
    
}
export class Bishop {
    
}
export class Rock {
    
}
export class Queen {
    
}
export class King {
    
}
export class MoveLegalityTest {
    public passedTheMove: Boolean;
    private Piece;
  
    constructor() {
      this.passedTheMove = this.checkMove()
    }
    public getPieceType(pieceId: string){
        if(pieceId.includes("Pawn")){
            this.Piece = new Pawn
        }
        else if (pieceId.includes("Knight")){
            this.Piece = new Knight
        }
        else if (pieceId.includes("Bishop")){
            this.Piece = new Bishop
        }
        else if (pieceId.includes("Rock")){
            this.Piece = new Rock
        }
        else if (pieceId.includes("Queen")){
            this.Piece = new Queen
        }
        else {
            this.Piece = new King
        }
    }
    public checkMove(): boolean {
      //if sth 
      return true
    }

  }
  //this a prototype for now