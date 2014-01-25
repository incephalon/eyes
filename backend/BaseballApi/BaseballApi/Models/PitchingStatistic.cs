//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BaseballApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class PitchingStatistic
    {
        public int Id { get; set; }
        public int TeamPlayerId { get; set; }
        public System.DateTime TimeStamp { get; set; }
        public Nullable<short> Rk { get; set; }
        public Nullable<short> Gcar { get; set; }
        public Nullable<double> Gtm { get; set; }
        public string Column_7 { get; set; }
        public string Opp { get; set; }
        public string Rslt { get; set; }
        public string score { get; set; }
        public string Inngs { get; set; }
        public string Dec { get; set; }
        public Nullable<short> DR { get; set; }
        public Nullable<double> IP { get; set; }
        public Nullable<short> H { get; set; }
        public Nullable<short> R { get; set; }
        public Nullable<short> ER { get; set; }
        public Nullable<short> BB { get; set; }
        public Nullable<short> SO { get; set; }
        public Nullable<short> HR { get; set; }
        public Nullable<short> HBP { get; set; }
        public Nullable<double> ERA { get; set; }
        public Nullable<short> BF { get; set; }
        public Nullable<short> Pit { get; set; }
        public Nullable<short> Str { get; set; }
        public Nullable<short> StL { get; set; }
        public Nullable<short> StS { get; set; }
        public Nullable<short> GB { get; set; }
        public Nullable<short> FB { get; set; }
        public Nullable<short> LD { get; set; }
        public Nullable<short> PU { get; set; }
        public Nullable<short> Unk { get; set; }
        public Nullable<short> GSc { get; set; }
        public Nullable<short> IR { get; set; }
        public Nullable<short> IS { get; set; }
        public Nullable<short> SB { get; set; }
        public Nullable<short> CS { get; set; }
        public Nullable<short> PO { get; set; }
        public Nullable<short> AB { get; set; }
        public Nullable<short> C2B { get; set; }
        public Nullable<short> C3B { get; set; }
        public Nullable<short> IBB { get; set; }
        public Nullable<short> GDP { get; set; }
        public Nullable<double> SF { get; set; }
        public Nullable<short> ROE { get; set; }
        public Nullable<double> aLI { get; set; }
        public Nullable<double> WPA { get; set; }
        public Nullable<double> RE24 { get; set; }
        public string Entered { get; set; }
    
        public virtual TeamPlayer TeamPlayer { get; set; }
    }
}
