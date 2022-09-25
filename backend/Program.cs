using backend.DataAccesses;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Text.Json.Serialization;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
// Add services and configure the app here.

builder.Services.AddDbContext<SalaryContext>(options => options.UseSqlServer("Server=DESKTOP-DMEHTN5\\SQLEXPRESS;Database=FcdSalary;User Id=ocn123;Password=Olcan123456;"));

//builder.Services.AddDbContext<SalaryContext>(options => options.UseMySql("server=localhost;database=FcdSalary;user=root;password=OcN510.mZo;port=3306;Connect Timeout=5;",new MySqlServerVersion(new Version(8,0,25))));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();
// Middleware



if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

//include icine eklemek için
JsonSerializerOptions options = new()
{
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    WriteIndented = true,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};

//cors
app.UseCors("AllowAll");

//isciler
app.MapGet("/employees", ([FromServices] SalaryContext context) => context.Employees.ToList());

app.MapGet("/employees/{id}", ([FromServices] SalaryContext context, int id) => context.Employees.FirstOrDefault(x => x.Id == id));

app.MapPost("/employees", ([FromServices] SalaryContext context, Employee employee) =>
{
    context.Employees.Add(employee);
    context.SaveChanges();
    return Results.Created($"/employees/{employee.Id}", employee);
});

app.MapDelete("/employees/{id}", ([FromServices] SalaryContext context, int id) =>
{
    context.Employees.Remove(new Employee { Id = id });
    context.SaveChanges();
    return Results.Ok(true);
});

app.MapPut("/employees", ([FromServices] SalaryContext context, Employee employee) =>
{
    context.Employees.Update(employee);
    context.SaveChanges();
    return Results.Ok();
});

//sirketler
app.MapGet("/companies", ([FromServices] SalaryContext context) => context.Companies.ToList());

app.MapGet("/companies/{id}", ([FromServices] SalaryContext context, int id) => context.Companies.FirstOrDefault(x => x.Id == id));

app.MapPost("/companies", ([FromServices] SalaryContext context, Company company) =>
{
    context.Companies.Add(company);
    context.SaveChanges();
    return Results.Created($"/companies/{company.Id}", company);
});

app.MapDelete("/companies/{id}", ([FromServices] SalaryContext context, int id) =>
{
    context.Companies.Remove(new Company { Id = id });
    context.SaveChanges();
    return Results.Ok();
});

app.MapPut("/companies", ([FromServices] SalaryContext context, Company company) =>
{
    context.Companies.Update(company);
    context.SaveChanges();
    return Results.Ok();
});


//maaslar

app.MapGet("/salaries/update/{id}", ([FromServices] SalaryContext context, int id) => JsonSerializer.Serialize(context.SalaryHeads.Include(x => x.SalaryLines).FirstOrDefault(x => x.Id == id), options));

app.MapGet("/salaries/excel/{id}", ([FromServices] SalaryContext context, int id) =>
{
    var result = from line in context.SalaryLines
                 join employee in context.Employees on line.EmployeeId equals employee.Id
                 where line.SalaryHeadId == id
                 select new
                 {
                     FirstName = employee.FirstName,
                     LastName = employee.LastName,
                     id = employee.NationalId,
                     GrossSalary = line.GrossSalary,
                     EmployeeContribute = line.EmployeeContribute,
                     EmployerContribute = line.EmployerContribute
                 };

    return JsonSerializer.Serialize(result.ToList(), options);

});

app.MapGet("/salaries", ([FromServices] SalaryContext context, [FromQuery] string month, [FromQuery] string year) =>
{
    var result = from head in context.SalaryHeads
                 join company in context.Companies on head.CompanyId equals company.Id
                 join line in context.SalaryLines on head.Id equals line.SalaryHeadId
                 group new { head, company, line } by new { head.Id, head.CompanyId, head.Month, head.Year, company.Name } into g
                 select new
                 {
                     Id = g.Key.Id,
                     CompanyId = g.Key.CompanyId,
                     Month = g.Key.Month,
                     Year = g.Key.Year,
                     CompanyName = g.Key.Name,
                     EmployeeCount = g.Count(),
                     TotalNetSalary = g.Sum(x => x.line.NetSalary),
                     TotalGrossSalary = g.Sum(x => x.line.GrossSalary),
                     TotalTaxSalary = g.Sum(x => x.line.TaxSalary),
                     TotalEmployeeContribute = g.Sum(x => x.line.EmployeeContribute),
                     TotalEmployerContribute = g.Sum(x => x.line.EmployerContribute),
                     TotalContribute = g.Sum(x => x.line.EmployeeContribute + x.line.EmployerContribute),
                     TotalSalary = g.Sum(x => x.line.GrossSalary + x.line.EmployeeContribute)
                 };

    return month == null && year == null
    ? JsonSerializer.Serialize(result.ToList(), options)
    : JsonSerializer.Serialize(result.Where(x => x.Month == month && x.Year == year).ToList(), options);
});

//byHeadId firstordefealt
app.MapGet("/salaries/{id}", ([FromServices] SalaryContext context, int id) =>
{
    var result = from head in context.SalaryHeads
                 join company in context.Companies on head.CompanyId equals company.Id
                 join line in context.SalaryLines on head.Id equals line.SalaryHeadId
                 group new { head, company, line } by new { head.Id, head.CompanyId, head.Month, head.Year, company.Name } into g
                 select new
                 {
                     Id = g.Key.Id,
                     CompanyId = g.Key.CompanyId,
                     Month = g.Key.Month,
                     Year = g.Key.Year,
                     CompanyName = g.Key.Name,
                     EmployeeCount = g.Count(),
                     TotalNetSalary = g.Sum(x => x.line.NetSalary),
                     TotalGrossSalary = g.Sum(x => x.line.GrossSalary),
                     TotalTaxSalary = g.Sum(x => x.line.TaxSalary),
                     TotalEmployeeContribute = g.Sum(x => x.line.EmployeeContribute),
                     TotalEmployerContribute = g.Sum(x => x.line.EmployerContribute),
                     TotalContribute = g.Sum(x => x.line.EmployeeContribute + x.line.EmployerContribute),
                     TotalSalary = g.Sum(x => x.line.GrossSalary + x.line.EmployeeContribute)
                 };

    return JsonSerializer.Serialize(result.FirstOrDefault(x => x.Id == id), options);
});

//byCompanyId to list
app.MapGet("/salaries/companies/{id}", ([FromServices] SalaryContext context, int id, [FromQuery] string month, [FromQuery] string year) =>
{
    var result = from head in context.SalaryHeads
                 join company in context.Companies on head.CompanyId equals company.Id
                 join line in context.SalaryLines on head.Id equals line.SalaryHeadId
                 where head.CompanyId == id
                 group new { head, company, line } by new { head.Id, head.CompanyId, head.Month, head.Year, company.Name } into g
                 select new
                 {
                     Id = g.Key.Id,
                     CompanyId = g.Key.CompanyId,
                     Month = g.Key.Month,
                     Year = g.Key.Year,
                     CompanyName = g.Key.Name,
                     EmployeeCount = g.Count(),
                     TotalNetSalary = g.Sum(x => x.line.NetSalary),
                     TotalGrossSalary = g.Sum(x => x.line.GrossSalary),
                     TotalTaxSalary = g.Sum(x => x.line.TaxSalary),
                     TotalEmployeeContribute = g.Sum(x => x.line.EmployeeContribute),
                     TotalEmployerContribute = g.Sum(x => x.line.EmployerContribute),
                     TotalContribute = g.Sum(x => x.line.EmployeeContribute + x.line.EmployerContribute),
                     TotalSalary = g.Sum(x => x.line.GrossSalary + x.line.EmployeeContribute)
                 };

    return month == null && year == null
    ? JsonSerializer.Serialize(result.ToList(), options)
    : JsonSerializer.Serialize(result.Where(x => x.Month == month && x.Year == year).ToList(), options);
});

app.MapPost("/salaries", ([FromServices] SalaryContext context, SalaryModel model) =>
{
    context.SalaryHeads.Add(model.SalaryHead);
    context.SaveChanges();
    model.SalaryLines.ForEach(x => x.SalaryHeadId = model.SalaryHead.Id);
    context.SalaryLines.AddRange(model.SalaryLines);
    context.SaveChanges();

    var result = from head in context.SalaryHeads
                 join company in context.Companies on head.CompanyId equals company.Id
                 join line in context.SalaryLines on head.Id equals line.SalaryHeadId
                 group new { head, company, line } by new { head.Id, head.CompanyId, head.Month, head.Year, company.Name } into g
                 select new
                 {
                     Id = g.Key.Id,
                     CompanyId = g.Key.CompanyId,
                     Month = g.Key.Month,
                     Year = g.Key.Year,
                     CompanyName = g.Key.Name,
                     EmployeeCount = g.Count(),
                     TotalNetSalary = g.Sum(x => x.line.NetSalary),
                     TotalGrossSalary = g.Sum(x => x.line.GrossSalary),
                     TotalTaxSalary = g.Sum(x => x.line.TaxSalary),
                     TotalEmployeeContribute = g.Sum(x => x.line.EmployeeContribute),
                     TotalEmployerContribute = g.Sum(x => x.line.EmployerContribute),
                     TotalContribute = g.Sum(x => x.line.EmployeeContribute + x.line.EmployerContribute),
                     TotalSalary = g.Sum(x => x.line.GrossSalary + x.line.EmployeeContribute)
                 };


    return JsonSerializer.Serialize(result.FirstOrDefault(x => x.Id == model.SalaryHead.Id), options);
});

app.MapDelete("/salaries/{id}", ([FromServices] SalaryContext context, int id) =>
{
    var SalaryLines = context.SalaryLines.Where(x => x.SalaryHeadId == id).ToList();
    context.SalaryLines.RemoveRange(SalaryLines);
    context.SalaryHeads.Remove(new SalaryHead { Id = id });
    context.SaveChanges();
    return Results.Ok("Deleted");
});

app.MapPut("/salaries", ([FromServices] SalaryContext context, SalaryModel model) =>
{
    context.SalaryHeads.Update(model.SalaryHead);
    context.SaveChanges();
    var SalaryLines = context.SalaryLines.Where(x => x.SalaryHeadId == model.SalaryHead.Id).ToList();
    context.SalaryLines.RemoveRange(SalaryLines);
    context.SaveChanges();
    model.SalaryLines.ForEach(x => { x.SalaryHeadId = model.SalaryHead.Id; x.Id = 0; });
    context.SalaryLines.AddRange(model.SalaryLines);
    context.SaveChanges();

    var result = from head in context.SalaryHeads
                 join company in context.Companies on head.CompanyId equals company.Id
                 join line in context.SalaryLines on head.Id equals line.SalaryHeadId
                 group new { head, company, line } by new { head.Id, head.CompanyId, head.Month, head.Year, company.Name } into g
                 select new
                 {
                     Id = g.Key.Id,
                     CompanyId = g.Key.CompanyId,
                     Month = g.Key.Month,
                     Year = g.Key.Year,
                     CompanyName = g.Key.Name,
                     EmployeeCount = g.Count(),
                     TotalNetSalary = g.Sum(x => x.line.NetSalary),
                     TotalGrossSalary = g.Sum(x => x.line.GrossSalary),
                     TotalTaxSalary = g.Sum(x => x.line.TaxSalary),
                     TotalEmployeeContribute = g.Sum(x => x.line.EmployeeContribute),
                     TotalEmployerContribute = g.Sum(x => x.line.EmployerContribute),
                     TotalContribute = g.Sum(x => x.line.EmployeeContribute + x.line.EmployerContribute),
                     TotalSalary = g.Sum(x => x.line.GrossSalary + x.line.EmployeeContribute)
                 };


    return JsonSerializer.Serialize(result.FirstOrDefault(x => x.Id == model.SalaryHead.Id), options);
});


app.Run();