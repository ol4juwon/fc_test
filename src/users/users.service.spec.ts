import { Test, TestingModule } from '@nestjs/testing';
import { ObjectionModule } from 'nestjs-objection/dist';
import { User } from './model/user.model';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ObjectionModule.forRoot({
          config: {
            client: 'mysql',
            connection: {
              host: '127.0.0.1',
              user: 'ola',
              password: 'concheradmin',
              database: 'foodcourt',
            },
          },
        }),
        ObjectionModule.forFeature([User]),
      ],
      providers: [
        UsersService,
        {
          provide: User,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('attempt to create trabsaction with valid data', async () => {
      expect.assertions(2);
    });
  });
});
