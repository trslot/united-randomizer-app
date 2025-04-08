import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../Environments/Environment';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-season2',
  standalone: true,
  imports: [MatCheckboxModule, MatButtonModule, MatDividerModule, MatExpansionModule, MatListModule],
  templateUrl: './season2.component.html',
  styleUrl: './season2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Season2Component implements OnInit {

  config = {
    apiKey: environment.firebase.apiKey,
    authDomain: environment.firebase.authDomain,
    databaseURL: environment.firebase.databaseURL,
    projectId: environment.firebase.projectId,
    storageBucket: environment.firebase.storageBucket,
    messagingSenderId: environment.firebase.messagingSenderId,
    appId: environment.firebase.appId,
    measurementId: environment.firebase.measurementId
  }

  marvelUnitedXMenHeroes: Array<string> = [];
  marvelUnitedXMenAntiHeroes: Array<string> = [];
  marvelUnitedXMenVillains: Array<string> = [];
  marvelUnitedXMenLocations: Array<string> = [];

  blueTeamHeroes: Array<string> = [];
  blueTeamVillains: Array<string> = [];
  blueTeamLocations: Array<string> = [];

  daysOfFuturePastHeroes: Array<string> = [];
  daysOfFuturePastVillains: Array<string> = [];

  deadpoolHeroes: Array<string> = [];
  deadpoolAntiHeroes: Array<string> = [];
  deadpoolVillains: Array<string> = [];
  deadpoolLocations: Array<string> = [];

  fantasticFourHeroes: Array<string> = [];
  fantasticFourAntiHeroes: Array<string> = [];
  fantasticFourVillains: Array<string> = [];
  fantasticFourLocations: Array<string> = [];

  firstClassHeroes: Array<string> = [];
  firstClassVillains: Array<string> = [];
  firstClassLocations: Array<string> = [];

  goldTeamHeroes: Array<string> = [];
  goldTeamVillains: Array<string> = [];
  goldTeamLocations: Array<string> = [];

  phoenixFiveHeroes: Array<string> = [];
  phoenixFiveVillains: Array<string> = [];

  theHorsemenOfApocalypseAntiHeroes: Array<string> = [];
  theHorsemenOfApocalypseVillains: Array<string> = [];
  theHorsemenOfApocalypseLocations: Array<string> = [];

  xForceHeroes: Array<string> = [];
  xForceVillains: Array<string> = [];
  xForceLocations: Array<string> = [];

  mutantPledgeBonusHeroes: Array<string> = [];

  mutantPromosHeroes: Array<string> = [];
  mutantPromosAntiHeroes: Array<string> = [];
  mutantPromosVillains: Array<string> = [];

  selectedHeroes: string[] = [];
  selectedVillains: string[] = [];
  selectedLocations: string[] = [];
  selectedAntiHeroes: string[] = [];

  isAllSelected(items: string[], selected: string[]): boolean {
    return items.length > 0 && items.every(item => selected.includes(item));
  }

  toggleSelectAll(items: string[], selected: string[]): void {
    if (this.isAllSelected(items, selected)) {
      items.forEach(item => {
        const index = selected.indexOf(item);
        if (index !== -1) selected.splice(index, 1);
      });
    } else {
      items.forEach(item => {
        if (!selected.includes(item)) selected.push(item);
      });
    }
  }

  toggleSelection(item: string, selected: string[]): void {
    const index = selected.indexOf(item);
    if (index !== -1) {
      selected.splice(index, 1);
    } else {
      selected.push(item);
    }
  }

  ngOnInit(): void {
    const app = initializeApp(this.config);
    const db = getDatabase();
    const auth = getAuth();

    const gamesRef = ref(db, '0');

    get(gamesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const dbData = snapshot.val();

        // Helper function to filter and map the data
        function getFilteredNames(data: any[], game: string) {
          const gameData = data.filter((x: any) => x.season === 2 && x.game === game);

          return {
            heroes: gameData.filter((c: any) => c.type === 1).map((name: any) => name.name),
            antiHeroes: gameData.filter((c: any) => c.type === 4).map((name: any) => name.name),
            villains: gameData.filter((c: any) => c.type === 2).map((name: any) => name.name),
            locations: gameData.filter((c: any) => c.type === 3).map((name: any) => name.name)
          };
        }

        //Marvel United: X-Men
        const marvelUnitedXMenData = getFilteredNames(dbData, 'Marvel United: X-Men');
        this.marvelUnitedXMenHeroes = marvelUnitedXMenData.heroes;
        this.marvelUnitedXMenAntiHeroes = marvelUnitedXMenData.antiHeroes;
        this.marvelUnitedXMenVillains = marvelUnitedXMenData.villains;
        this.marvelUnitedXMenLocations = marvelUnitedXMenData.locations;

        //Blue Team
        const blueTeamData = getFilteredNames(dbData, 'Blue Team');
        this.blueTeamHeroes = blueTeamData.heroes;
        this.blueTeamVillains = blueTeamData.villains;
        this.blueTeamLocations = blueTeamData.locations;

        //Days of Future Past
        const daysOfFuturePastData = getFilteredNames(dbData, 'Days of Future Past');
        this.daysOfFuturePastHeroes = daysOfFuturePastData.heroes;
        this.daysOfFuturePastVillains = daysOfFuturePastData.villains;

        //Deadpool
        const deadpoolData = getFilteredNames(dbData, 'Deadpool');
        this.deadpoolHeroes = deadpoolData.heroes;
        this.deadpoolAntiHeroes = deadpoolData.antiHeroes;
        this.deadpoolVillains = deadpoolData.villains;
        this.deadpoolLocations = deadpoolData.locations;

        //Fantastic Four
        const fantasticFourData = getFilteredNames(dbData, 'Fantastic Four');
        this.fantasticFourHeroes = fantasticFourData.heroes;
        this.fantasticFourAntiHeroes = fantasticFourData.antiHeroes;
        this.fantasticFourVillains = fantasticFourData.villains;
        this.fantasticFourLocations = fantasticFourData.locations;

        //First Class
        const firstClassData = getFilteredNames(dbData, 'First Class');
        this.firstClassHeroes = firstClassData.heroes;
        this.firstClassVillains = firstClassData.villains;
        this.firstClassLocations = firstClassData.locations;

        //Gold Team
        const goldTeamData = getFilteredNames(dbData, 'Gold Team');
        this.goldTeamHeroes = goldTeamData.heroes;
        this.goldTeamVillains = goldTeamData.villains;
        this.goldTeamLocations = goldTeamData.locations;

        //Phoenix Five
        const phoenixFiveData = getFilteredNames(dbData, 'Phoenix Five');
        this.phoenixFiveHeroes = phoenixFiveData.heroes;
        this.phoenixFiveVillains = phoenixFiveData.villains;

        //The Horsemen of Apocalypse
        const theHorsemenOfApocalypseData = getFilteredNames(dbData, 'The Horsemen of Apocalypse');
        this.theHorsemenOfApocalypseAntiHeroes = theHorsemenOfApocalypseData.antiHeroes;
        this.theHorsemenOfApocalypseVillains = theHorsemenOfApocalypseData.villains;
        this.theHorsemenOfApocalypseLocations = theHorsemenOfApocalypseData.locations;

        //X-Force
        const xForceData = getFilteredNames(dbData, 'X-Force');
        this.xForceHeroes = xForceData.heroes;
        this.xForceVillains = xForceData.villains;
        this.xForceLocations = xForceData.locations;

        //Mutant Pledge Bonus
        const mutantPledgeBonusData = getFilteredNames(dbData, 'Mutant Pledge Bonus');
        this.mutantPledgeBonusHeroes = mutantPledgeBonusData.heroes;

        //Mutant Promos
        const mutantPromosData = getFilteredNames(dbData, 'Mutant Promos');
        this.mutantPromosHeroes = mutantPromosData.heroes;
        this.mutantPromosAntiHeroes = mutantPromosData.antiHeroes;
        this.mutantPromosVillains = mutantPromosData.villains;

        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            const db = getFirestore();
            const userSelectionsRef = collection(db, 'userSelections');
            const q = query(
              userSelectionsRef,
              where('userId', '==', uid),
              orderBy('timestamp', 'desc'),
              limit(1)
            );

            getDocs(q).then((querySnapshot) => {
              if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data = doc.data();
                this.selectedHeroes = data['heroes'] || [];
                this.selectedAntiHeroes = data['antiHeroes'] || [];
                this.selectedVillains = data['villains'] || [];
                this.selectedLocations = data['locations'] || [];
              } else {
                console.log('No saved selections found for user');
              }
            }).catch((error) => {
              console.error('Error fetching user selections:', error);
            });
            // ...


          } else {
            console.log("No data available");
          }
        });
      } else {
        // User is signed out
        // ...

        //Set everything to selected
        this.selectedHeroes = [...this.marvelUnitedXMenHeroes, ...this.blueTeamHeroes, ...this.daysOfFuturePastHeroes, ...this.deadpoolHeroes,...this.fantasticFourHeroes, ...this.firstClassHeroes, ...this.goldTeamHeroes, ...this.phoenixFiveHeroes, ...this.xForceHeroes, ...this.mutantPledgeBonusHeroes, ...this.mutantPromosHeroes ];
        this.selectedAntiHeroes = [...this.marvelUnitedXMenAntiHeroes, ...this.deadpoolAntiHeroes,...this.fantasticFourAntiHeroes, ...this.theHorsemenOfApocalypseAntiHeroes, ...this.mutantPromosAntiHeroes];
        this.selectedVillains = [...this.marvelUnitedXMenVillains, ...this.blueTeamVillains, ...this.daysOfFuturePastVillains, ...this.deadpoolVillains,...this.fantasticFourVillains, ...this.firstClassVillains, ...this.goldTeamVillains, ...this.phoenixFiveVillains, ...this.theHorsemenOfApocalypseVillains, ...this.xForceVillains, ...this.mutantPromosVillains ];
        this.selectedLocations = [...this.marvelUnitedXMenLocations, ...this.blueTeamLocations, ...this.deadpoolLocations,...this.fantasticFourLocations, ...this.firstClassLocations, ...this.goldTeamLocations, ...this.theHorsemenOfApocalypseLocations, ...this.xForceLocations];
      }
    });
  }
}
