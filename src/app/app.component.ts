import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SessionService } from './core/services';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.style.scss'
    ],
    template: `
        <main>
            <router-outlet></router-outlet>

            <jetpad-modal-placeholder></jetpad-modal-placeholder>
        </main>

    `
})

export class AppComponent implements OnInit {

    constructor(private sessionSrv: SessionService) {
    }

    public ngOnInit() {
        if (!module.hot) {
            this.sessionSrv.startDefaultSession()
                .subscribe(
                    () => {
                        console.debug('session initialized');
                    },
                    () => this.sessionSrv.startAnonymousSession()
                        .subscribe(() => {
                            console.debug('session initialized anonymously');
                        })
                );
        }
    }
}
