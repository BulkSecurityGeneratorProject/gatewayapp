/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayappTestModule } from '../../../../test.module';
import { DealerUpdateComponent } from 'app/entities/dealer/dealer/dealer-update.component';
import { DealerService } from 'app/entities/dealer/dealer/dealer.service';
import { Dealer } from 'app/shared/model/dealer/dealer.model';

describe('Component Tests', () => {
    describe('Dealer Management Update Component', () => {
        let comp: DealerUpdateComponent;
        let fixture: ComponentFixture<DealerUpdateComponent>;
        let service: DealerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayappTestModule],
                declarations: [DealerUpdateComponent]
            })
                .overrideTemplate(DealerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DealerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DealerService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Dealer(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.dealer = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Dealer();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.dealer = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
