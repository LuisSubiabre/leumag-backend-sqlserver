import { poolPromise } from "../db.js";

export class MatalumnoModel {
  static async getByRut(rutalum) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().input("rutalum", rutalum).query(`
                    SELECT 
                        unico, ano, patalum, matalum, nomalum, rutalum,
                        CONVERT(varchar, fecnac, 23) as fecnac,
                        edad,
                        DATEDIFF(YEAR, fecnac, GETDATE()) - 
                        CASE 
                            WHEN DATEADD(YEAR, DATEDIFF(YEAR, fecnac, GETDATE()), fecnac) > GETDATE() 
                            THEN 1 
                            ELSE 0 
                        END as edad_calculada,
                        sexo, dirpar, telpar, celular,
                        currep, vivecon, coleproced, nulo, mat2024,
                        CONVERT(varchar, fecmat, 23) as fecmat,
                        correo, cursole, letra, real2024,
                        is_active, is_staff
                    FROM matalumno 
                    WHERE REPLACE(REPLACE(rutalum, '.', ''), '-', '') = @rutalum
                `);

      return result.recordset[0] || null;
    } catch (error) {
      throw new Error(`Error al buscar alumno por RUT: ${error.message}`);
    }
  }
}
