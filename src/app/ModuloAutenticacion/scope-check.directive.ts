import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './providers/auth.service';

@Directive({
    selector: '[scopeCheck]'
})
export class ScopeCheckDirective {

    private operatorToUse = "AND";

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private auth: AuthService) {
    }

    @Input() set scopeCheckOperator(operatorToUse: string){
        this.operatorToUse = operatorToUse;
    }

    @Input() set scopeCheck(scopes: string[]) {
        if (!scopes || !scopes.length)
            this.viewContainer.createEmbeddedView(this.templateRef);
        else if (this.operatorToUse == 'OR')
            if(this.auth.hasScopesOr(scopes))
                this.viewContainer.createEmbeddedView(this.templateRef);
            else
                this.viewContainer.clear();
        else if (this.auth.hasScopes(scopes))
            this.viewContainer.createEmbeddedView(this.templateRef);
        else
            this.viewContainer.clear();
    }
}
