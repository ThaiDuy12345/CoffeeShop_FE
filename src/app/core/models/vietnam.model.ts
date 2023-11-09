export class Province{
  name: string = ""
  code: number = 0
  codename: string = ""
  division_type: string = ""
  phone_code: number = 0
  districts: District[] = []
}

export class District{
  name: string = ""
  code: number = 0
  codename: string = ""
  division_type: string = ""
  short_codename: string = ""
  wards: Ward[] = []
}

export class Ward{
  name: string = ""
  code: number = 0
  codename: string = ""
  division_type: string = ""
  short_codename: string = ""
}