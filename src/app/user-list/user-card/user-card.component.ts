import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "../../user.interface.ts";

@Component({
    selector: 'app-user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
    @Input()
    user!: User;

    @Output()
    userCardDelete = new EventEmitter();

    onUserDelete(UserId: number) {
        this.userCardDelete.emit(UserId);
    }
}