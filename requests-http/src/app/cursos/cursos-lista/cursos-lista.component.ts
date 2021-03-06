import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';
//preserveWhitespacesDefault: true
import { Observable, empty, of, Subject, EMPTY } from 'rxjs';
import { catchError, switchMap, delay } from 'rxjs/operators';
import { Curso } from './curso';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService) { }

  ngOnInit() {
    // this.service.list()
    //   .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
     this.cursos$ = this.service.list()
     .pipe(
       // map(),
       // tap(),
       // switchMap(),
       delay(3000),
       catchError(error => {
         console.error(error);
         this.error$.next(true);
         return EMPTY;
       })
     );

  //    this.service.list()
  //    .pipe(
  //      catchError(error => empty())
  //    )
  //    .subscribe(
  //      dados => {
  //        console.log(dados);
  //      }
  //      // ,error => console.error(error),
  //     // () => console.log('Obserservable completo!')
  //    );
  // 
  }

}



